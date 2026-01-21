import React from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface HeroProps {
    lastUpdated?: Date;
}

export const Hero: React.FC<HeroProps> = ({ lastUpdated }) => {
    return (
        <div className="relative py-12 px-6 sm:px-12 rounded-3xl overflow-hidden mb-12">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 md:from-indigo-950 md:via-slate-900 md:to-slate-950" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-7xl mx-auto">
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-4">
                        UK Politics <span className="text-indigo-400">Daily.</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Fact-checked, neutral, and concise summaries of the last 24 hours in Westminster and beyond.
                    </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-300">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Last Updated: <span className="font-mono text-white">{lastUpdated ? format(lastUpdated, 'HH:mm dd MMM') : 'Just now'}</span></span>
                </div>
            </div>
        </div>
    );
};
