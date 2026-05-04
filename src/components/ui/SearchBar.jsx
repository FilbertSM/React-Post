import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-text-secondary" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border-2 border-text-secondary/30 bg-surface-card text-text-primary rounded-md focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary font-mono text-sm placeholder-text-secondary/70 transition-colors"
        placeholder="> query prompts --model=gpt4 --text='...'"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}