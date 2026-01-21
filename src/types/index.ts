export interface NewsStory {
    headline: string;
    category: string;
    summary: string; // The prompt asked for "Three-sentence summary", might be a string or array? Prompt said "A Three-sentence summary". Usually simple string.
    stakeholders: string[];
    sentiment: 'Neutral' | 'Controversial' | 'Developing' | string;
}

export interface NewsResponse {
    stories: NewsStory[];
    citations: string[];
    error?: string;
}
