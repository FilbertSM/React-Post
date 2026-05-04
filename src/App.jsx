import React, { useState } from 'react';
import { usePrompts } from './hooks/usePrompts';
import PromptCard from './components/vault/PromptCard';
import SkeletonCard from './components/ui/SkeletonCard';
import SearchBar from './components/ui/SearchBar';
import { Terminal, Database, Zap } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVaultInitialized, setIsVaultInitialized] = useState(false);

  // We are skipping pagination for this specific high-speed terminal view, just loading all matching
  const { data: prompts, isLoading, isError } = usePrompts({ search: searchTerm });

  if (!isVaultInitialized) {
    return (
      <div className="min-h-screen p-8 text-center flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 border-[rgba(139,148,158,0.05)] border-[1px] bg-[linear-gradient(rgba(139,148,158,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,148,158,0.05)_1px,transparent_1px)] bg-[size:30px_30px] -z-10 w-full h-full"></div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-text-primary tracking-tighter hover:terminal-glow transition-all">
          PromptVault<span className="text-brand-primary animate-pulse">_</span>
        </h1>
        
        <p className="text-text-secondary max-w-xl mx-auto mb-10 text-base leading-relaxed">
          A high-performance, flat-file terminal to store, search, and execute AI payloads. 
          Built for engineers. Zero bloat. Absolute control.
        </p>
        
        <button 
          onClick={() => setIsVaultInitialized(true)}
          className="bg-brand-primary text-surface-bg px-10 py-4 font-bold uppercase text-sm tracking-[0.2em] hover:bg-[#2ea043] transition-all rounded-sm cursor-pointer border-2 border-brand-primary hover:shadow-[0_0_15px_rgba(63,185,80,0.4)]"
        >
          Initialize.exe
        </button>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-left">
          <div className="border border-text-secondary/20 bg-surface-card p-6 rounded-md">
            <Terminal className="text-brand-primary mb-4" size={24} />
            <h3 className="font-bold text-text-primary mb-2">Terminal Alpha UI</h3>
            <p className="text-text-secondary text-xs">Strict brutalist aesthetic. IBM Plex Mono exclusively. Engineered for focus and high contrast readability.</p>
          </div>
          <div className="border border-text-secondary/20 bg-surface-card p-6 rounded-md">
            <Database className="text-brand-primary mb-4" size={24} />
            <h3 className="font-bold text-text-primary mb-2">Flat-File Engine</h3>
            <p className="text-text-secondary text-xs">No heavy database overhead. Powered by a lightweight Express REST API persisting directly via RAM.</p>
          </div>
          <div className="border border-text-secondary/20 bg-surface-card p-6 rounded-md">
            <Zap className="text-brand-primary mb-4" size={24} />
            <h3 className="font-bold text-text-primary mb-2">Mixed-Media Ready</h3>
            <p className="text-text-secondary text-xs">Agnostic support for GPT-4 logic arrays or Midjourney visual generation parameters within a singular view.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      {/* Header Bar */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-text-secondary/30">
        <h1 
          className="text-2xl font-bold text-text-primary tracking-tight cursor-pointer hover:text-brand-primary transition-colors"
          onClick={() => setIsVaultInitialized(false)}
        >
          PV<span className="text-brand-primary">_</span>
        </h1>
        <div className="text-xs text-text-secondary font-mono flex items-center gap-4">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span> BACKEND_STATUS: ONLINE</span>
        </div>
      </header>

      {/* Main Vault Interface */}
      <main>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {isError && (
          <div className="text-red-500 border border-red-500/50 bg-red-500/10 p-4 rounded-md text-center mb-8">
            ERR_CONNECTION_REFUSED: Could not connect to API core.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton Loading State
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : prompts?.length === 0 ? (
            <div className="col-span-full py-12 text-center text-text-secondary border border-text-secondary/20 border-dashed rounded-lg bg-surface-card/50">
              No parameters found matching `{searchTerm}`
            </div>
          ) : (
             // Actual Render
             prompts?.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}