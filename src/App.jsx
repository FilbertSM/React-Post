import React, { useState } from 'react';
import { usePrompts } from './hooks/usePrompts';
import PromptCard from './components/vault/PromptCard';
import SkeletonCard from './components/ui/SkeletonCard';
import SearchBar from './components/ui/SearchBar';
import { Terminal, Database, Zap, Sparkles } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVaultInitialized, setIsVaultInitialized] = useState(false);

  const { data: prompts, isLoading, isError } = usePrompts({ search: searchTerm });

  if (!isVaultInitialized) {
    return (
      <div className="min-h-screen p-6 md:p-8 text-center flex flex-col items-center justify-center relative overflow-hidden bg-surface-bg font-sans">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-medium text-text-secondary mb-8 mb-6 mt-12 md:mt-0 opacity-80 backdrop-blur-md">
          <Sparkles size={12} className="text-brand-primary" />
          <span>System V2.0 Online</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-text-primary tracking-tight">
          PromptVault<span className="text-text-muted">.</span>
        </h1>
        
        <p className="text-text-secondary max-w-lg mx-auto mb-12 text-sm md:text-base leading-relaxed tracking-wide">
          A high-performance architecture to store, retrieve, and execute AI logic. 
          Engineered for focus. Zero bloat. Absolute control.
        </p>
        
        <button 
          onClick={() => setIsVaultInitialized(true)}
          className="bg-brand-primary text-black px-8 py-4 font-semibold uppercase text-xs tracking-[0.15em] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-sm cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Initialize Engine
        </button>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left px-4">
          <div className="glass-panel p-8 rounded-xl hover:border-white/20 premium-hover transition-all">
            <Terminal className="text-text-primary mb-5" size={22} strokeWidth={1.5} />
            <h3 className="font-semibold text-text-primary mb-3 text-sm tracking-wide">Luxury Aesthetic</h3>
            <p className="text-text-secondary text-xs leading-relaxed">Pristine typography hierarchy and 4% film grain eliminate harsh digital artifacts for a premium editorial feel.</p>
          </div>
          <div className="glass-panel p-8 rounded-xl hover:border-white/20 premium-hover transition-all">
            <Database className="text-text-primary mb-5" size={22} strokeWidth={1.5} />
            <h3 className="font-semibold text-text-primary mb-3 text-sm tracking-wide">Flat-File Architecture</h3>
            <p className="text-text-secondary text-xs leading-relaxed">No heavy database overhead. Powered by a lightweight Express REST API persisting directly via RAM.</p>
          </div>
          <div className="glass-panel p-8 rounded-xl hover:border-white/20 premium-hover transition-all">
            <Zap className="text-text-primary mb-5" size={22} strokeWidth={1.5} />
            <h3 className="font-semibold text-text-primary mb-3 text-sm tracking-wide">Instant Execution</h3>
            <p className="text-text-secondary text-xs leading-relaxed">Zero-latency API reads. Search, filter, and extract payload structures instantly into your clipboard buffer.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-bg p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 relative z-20">
          <div>
            <h1 
              className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-2 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
              onClick={() => setIsVaultInitialized(false)}
            >
              PromptVault<span className="text-brand-primary/50 text-2xl">.</span>
            </h1>
            <p className="text-text-secondary text-sm flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
               System Core Online
            </p>
          </div>
          <div className="w-full md:w-[400px]">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </header>

        <main className="relative z-10">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {isError && (
            <div className="glass-panel border-red-500/30 p-6 rounded-lg text-red-400 font-mono text-sm text-center">
              [SYSTEM_FAILURE] Unable to connect to vault core. Ensure backend engine is online.
            </div>
          )}

          {!isLoading && !isError && prompts?.length === 0 && (
            <div className="glass-panel p-12 text-center text-text-secondary rounded-xl text-sm font-mono flex flex-col items-center justify-center border-dashed">
              <span className="text-4xl mb-4 opacity-50">∅</span>
              NO PAYLOADS FOUND MATCHING PARAMETERS.
            </div>
          )}

          {!isLoading && !isError && prompts?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
              {prompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}