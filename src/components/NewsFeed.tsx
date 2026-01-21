import React from 'react';
import { NewsCard } from './NewsCard';
import { NewsStory } from '@/types';
import { Loader2 } from 'lucide-react';

interface NewsFeedProps {
    stories: NewsStory[];
    isLoading: boolean;
    activeFilter: string;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ stories, isLoading, activeFilter }) => {
    const filteredStories = activeFilter === 'All'
        ? stories
        : stories.filter(s => s.category.toLowerCase() === activeFilter.toLowerCase());

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <p>Analyzing the latest developments...</p>
            </div>
        );
    }

    if (filteredStories.length === 0) {
        return (
            <div className="text-center py-20 text-slate-500">
                <p>No stories found in this category.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredStories.map((story, index) => (
                <NewsCard key={index} story={story} />
            ))}
        </div>
    );
};
