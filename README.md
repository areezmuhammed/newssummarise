# UK Political News Dashboard

A professional, real-time dashboard that aggregates, summarizes, and categorizes the latest UK political news using AI.

![UK Politics Daily](public/window.svg)

## 🚀 Overview

This project is a **Next.js** application designed to provide **concise, factual, and neutral** summaries of significant political events in the UK over the last 24 hours. 

It leverages the **Perplexity API (`sonar-pro`)** to function as an objective political analyst, fetching live data from reputable sources (BBC, The Guardian, Sky News) and formatting it into a clean, structured news feed.

## ✨ Features

- **🤖 AI-Powered Summaries**: Uses Large Language Models to distill complex political events into 3-sentence summaries.
- **⚖️ Sentiment Analysis**: Automatically categorizes stories as *Neutral*, *Controversial*, or *Developing*.
- **🔍 Source Transparency**: Lists all domains cited by the AI to ensure credibility.
- **⚡ Real-time Updates**: Fetches the latest news on every refresh (configurable caching).
- **🎨 Premium UI**: Built with **Tailwind CSS v4**, featuring glassmorphism, smooth gradients, and a responsive grid layout.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [Perplexity AI](https://docs.perplexity.ai/) (Model: `sonar-pro`)
- **Language**: TypeScript

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- An API Key from [Perplexity.ai](https://www.perplexity.ai/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/areezmuhammed/newssummarise.git
   cd newssummarise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory and add your API Key:
   ```env
   PERPLEXITY_API_KEY=pplx-your-api-key-here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/news/    # Secure API Route Proxy
│   │   ├── page.tsx     # Main Dashboard Component
│   │   └── globals.css  # Tailwind v4 Configuration
│   ├── components/      # UI Components (Hero, NewsCard, etc.)
│   └── types/           # TypeScript Interfaces
├── public/              # Static Assets
└── tailwind.config.ts   # (Optional if using standalone config)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
