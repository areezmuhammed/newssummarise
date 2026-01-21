import React from 'react';
import { NewsStory } from '@/types';
import { BadgeCheck, Users, TrendingUp, AlertCircle, MinusCircle } from 'lucide-react';

interface NewsCardProps {
    story: NewsStory;
    sourceUrl?: string; // Optional source link if we can map it
}

export const NewsCard: React.FC<NewsCardProps> = ({ story, sourceUrl }) => {
    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment.toLowerCase()) {
            case 'controversial': return <AlertCircle className="w-4 h-4 text-red-400" />;
            case 'developing': return <TrendingUp className="w-4 h-4 text-amber-400" />;
            default: return <MinusCircle className="w-4 h-4 text-emerald-400" />; // Neutral
        }
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment.toLowerCase()) {
            case 'controversial': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'developing': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        }
    };

    return (
        <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl overflow-hidden hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
                <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 text-xs font-semibold tracking-wide text-indigo-300 bg-indigo-500/20 rounded-full border border-indigo-500/30 uppercase">
                        {story.category}
                    </span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getSentimentColor(story.sentiment)}`}>
                        {getSentimentIcon(story.sentiment)}
                        {story.sentiment}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 leading-snug font-heading group-hover:text-indigo-200 transition-colors">
                    {story.headline}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 border-l-2 border-indigo-500/30 pl-3">
                    {story.summary}
                </p>
            </div>

            <div className="mt-auto">
                <div className="flex items-start gap-2 mb-4">
                    <Users className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <div className="flex flex-wrap gap-2">
                        {story.stakeholders.map((person, idx) => (
                            <span key={idx} className="text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">
                                {person}
                            </span>
                        ))}
                    </div>
                </div>

                {sourceUrl && (
                    <div className="pt-4 border-t border-white/5">
                        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                            <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                            Source
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
