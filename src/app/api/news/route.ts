import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Optional: Use Edge Runtime if desired, but Node is fine too. Let's stick to default/Node for compatibility.

export async function GET() {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const prompt = `
Retrieve and summarize the top 5 most significant political news stories in the UK from the last 24 hours.
For each story, provide:
1. A catchy but neutral Headline.
2. A Category (e.g., Westminster, Policy, Elections, Foreign Affairs).
3. A Three-sentence summary: The first sentence should state the event, the second should explain the context/implications, and the third should mention key figures involved.
4. Key Stakeholders: A list of individuals or parties involved.
5. Sentiment: A one-word label (Neutral, Controversial, or Developing).

Format Requirements:
Output must be a valid JSON object with a key "stories" containing an array of story objects.
Each story object should have fields: headline, category, summary, stakeholders, sentiment.
Do NOT include markdown formatting (like \`\`\`json) in the response, just the raw JSON string if possible, or I will parse it.
Ensure the language is British English.
`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a highly objective UK political analyst. Your task is to provide concise, factual, and neutral summaries of the latest UK political news. You must prioritize accuracy and ensure every claim is backed by a reputable source. You always output data in a clean JSON format for application integration.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        search_recency_filter: 'day',
        search_domain_filter: ['bbc.co.uk', 'theguardian.com', 'independent.co.uk', 'news.sky.com', 'itv.com', 'parliament.uk', 'gov.uk'],
        temperature: 0.1, // Low temperature for factual consistency
        return_citations: true
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API Error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch news from Perplexity', details: errorText }, { status: response.status });
    }

    const data = await response.json();

    // Perplexity returns content in choices[0].message.content
    let content = data.choices[0].message.content;
    const citations = data.citations || [];

    // Basic cleaning if the model wraps in code blocks
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();

    // Find JSON object if there is conversational preamble
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }

    try {
      const parsedContent = JSON.parse(content);
      // We need to attach citations. The model might not map them 1:1 perfectly in the JSON unless asked explicitly to link indices.
      // However, the prompt asked for "citations array matching each story".
      // Perplexity's 'return_citations' returns a flat list of URLs. 
      // Generative models might not reliably put indices in the JSON unless forced.
      // We will pass the global citations list to the frontend, or try to see if the model did it.
      // The Prompt said: "Include a separate 'citations' array matching each story."
      // Let's hope the model generates a 'citations' field in the JSON with URLs or indices.
      // If the model creates its own citations in the JSON text, great. If not, we leverage the 'citations' field from the API response.

      // Actually, Perplexity API `citations` field is metadata. The text content might reference them like [1], [2].
      // Strategies:
      // 1. Return the raw citations list and let frontend handle global list.
      // 2. If the JSON content has them, use them.

      return NextResponse.json({
        stories: parsedContent.stories || parsedContent, // Handle potential wrapping
        citations: citations
      });
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, content);
      return NextResponse.json({ error: 'Failed to parse news data', rawContent: content }, { status: 500 });
    }

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
