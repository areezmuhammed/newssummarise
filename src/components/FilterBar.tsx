import React from 'react';

interface FilterBarProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    categories: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange, categories }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-8">
            <button
                onClick={() => onFilterChange('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === 'All'
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
            >
                All News
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onFilterChange(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === cat
                            ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};
