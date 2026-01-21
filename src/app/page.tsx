'use client';

import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import { NewsFeed } from '@/components/NewsFeed';
import { FilterBar } from '@/components/FilterBar';
import { SourceList } from '@/components/SourceList';
import { NewsResponse, NewsStory } from '@/types';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Home() {
    const [data, setData] = useState<NewsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);
    const [activeFilter, setActiveFilter] = useState('All');

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/news');
            const json = await res.json();

            if (json.error) {
                throw new Error(json.error + (json.details ? `: ${json.details}` : ''));
            }

            setData(json);
            setLastUpdated(new Date());
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to load news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Extract unique categories from stories for filter
    const categories = data?.stories
        ? Array.from(new Set(data.stories.map(s => s.category)))
        : ['Westminster', 'Policy', 'Elections', 'Foreign Affairs']; // Defaults

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-20">
            <Hero lastUpdated={lastUpdated} />

            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    {error ? (
                        <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-red-500/5 border border-red-500/10">
                            <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                            <h2 className="text-xl font-bold text-red-200 mb-2">Unavailable</h2>
                            <p className="text-red-400/80 mb-6 text-center max-w-md">{error}</p>
                            <button
                                onClick={fetchData}
                                className="flex items-center gap-2 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-full transition-colors"
                            >
                                <RefreshCcw className="w-4 h-4" /> Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            <FilterBar
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                                categories={categories}
                            />
                            <NewsFeed
                                stories={data?.stories || []}
                                isLoading={loading}
                                activeFilter={activeFilter}
                            />
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-80 shrink-0 space-y-8">
                    {/* Can add more widgets here like "Trending Stakeholders" if we parsed them further */}
                    {data?.citations && <SourceList citations={data.citations} />}
                </div>
            </div>
        </main>
    );
}
