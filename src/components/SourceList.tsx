import React from 'react';
import { Globe, BookOpen } from 'lucide-react';

interface SourceListProps {
    citations: string[];
}

export const SourceList: React.FC<SourceListProps> = ({ citations }) => {
    // Extract domains and deduplicate
    const domains = Array.from(new Set(citations.map(url => {
        try {
            const hostname = new URL(url).hostname;
            return hostname.replace('www.', '');
        } catch {
            return null;
        }
    }).filter(Boolean))) as string[];

    if (domains.length === 0) return null;

    return (
        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 h-fit">
            <div className="flex items-center gap-2 mb-4 text-slate-200 font-semibold">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h3>Sources Scanned</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {domains.map((domain, idx) => (
                    <a
                        key={idx}
                        href={`https://${domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-indigo-300 rounded-lg transition-colors border border-white/5"
                    >
                        <Globe className="w-3 h-3" />
                        {domain}
                    </a>
                ))}
            </div>
        </div>
    );
};
