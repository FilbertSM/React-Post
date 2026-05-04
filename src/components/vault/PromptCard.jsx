import React, { useState } from 'react';
import { Copy, Check, Hash, Maximize2, X } from 'lucide-react';
import { useCopyPrompt } from '../../hooks/usePrompts';

export default function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const copyMutation = useCopyPrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt_text);
    setCopied(true);
    copyMutation.mutate(prompt.id);
    
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const aiModels = Array.isArray(prompt.ai_model) ? prompt.ai_model : [prompt.ai_model];
  const categories = Array.isArray(prompt.category) ? prompt.category : [prompt.category];

  return (
    <>
      <div className="glass-panel rounded-xl overflow-hidden flex flex-col premium-hover group h-[420px]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-text-secondary/10 flex justify-between items-start bg-surface-elevated/40 backdrop-blur-sm">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-text-primary font-semibold text-lg truncate font-sans tracking-tight">{prompt.title}</h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {aiModels.map((model, idx) => (
                <span key={idx} className="text-[10px] uppercase font-bold tracking-wider text-brand-primary border border-brand-primary/20 px-2 py-0.5 rounded-full bg-brand-primary/5 whitespace-nowrap font-mono selection:bg-brand-primary selection:text-black">
                  {model}
                </span>
              ))}
              <span className="text-[11px] text-text-secondary flex items-center gap-1 truncate font-mono">
                <Hash size={10} className="flex-shrink-0" /> {categories.join(', ')}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-text-secondary font-mono flex flex-col items-end flex-shrink-0 w-[60px] gap-1">
            <span className="text-text-muted">ID:{prompt.id.toString().padStart(3, '0')}</span>
            <span className="text-brand-primary/70">{prompt.copy_count} RUNS</span>
          </div>
        </div>

        {/* Image Handling */}
        {prompt.imageUrl ? (
          <div className="w-full h-32 border-b border-white/5 flex-shrink-0 overflow-hidden relative">
            {/* Inner subtle glow for premium feel */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/20 z-10"></div>
            <img 
              src={prompt.imageUrl} 
              alt={prompt.title} 
              className="w-full h-full object-cover scale-100 group-hover:scale-105 saturate-50 group-hover:saturate-100 transition-all duration-700 ease-out"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-32 border-b border-white/5 flex-shrink-0 bg-surface-bg/30 flex items-center justify-center text-text-secondary/20 font-mono text-[10px] tracking-widest uppercase">
            [ NO VISUAL DATA ]
          </div>
        )}

        {/* Body: Payload pure raw text */}
        <div className="p-5 flex-grow bg-surface-bg/20 overflow-hidden relative">
          <pre className="text-xs text-text-secondary/90 whitespace-pre-wrap font-mono leading-relaxed line-clamp-4 smooth-scrollbar selection:bg-white/20 selection:text-white">
            {prompt.prompt_text}
          </pre>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-4 right-4 p-2 bg-surface-elevated/80 backdrop-blur-md border border-white/10 rounded-full text-text-secondary hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            title="Inspect Payload"
          >
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Footer / Interaction */}
        <div className="p-3 border-t border-white/5 bg-surface-elevated/20 pb-4 px-4 flex-shrink-0">
          <button 
            onClick={handleCopy}
            className={`w-full py-2.5 flex items-center justify-center gap-2 font-bold uppercase tracking-[0.15em] text-[10px] sm:text-xs transition-all cursor-pointer rounded-sm
              ${copied 
                ? 'bg-brand-primary text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                : 'bg-white/5 text-text-primary border border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
          >
            {copied ? (
              <>
                <Check size={14} strokeWidth={3} /> COPIED
              </>
            ) : (
              <>
                <Copy size={14} /> COPY PAYLOAD
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal for Full Prompt */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xl transition-all duration-300">
          <div className="bg-surface-bg border border-white/10 sm:rounded-2xl rounded-t-2xl w-full max-w-2xl flex flex-col max-h-[90vh] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-300">
            
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-surface-card/50">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                <h2 className="text-text-primary font-semibold text-sm sm:text-base font-sans tracking-wide">Payload Inspection</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto flex-grow smooth-scrollbar">
              <h3 className="text-xl font-bold font-sans text-white mb-6 tracking-tight">{prompt.title}</h3>
              <div className="bg-surface-elevated/40 p-5 rounded-xl border border-white/5 shadow-inner">
                <pre className="text-[13px] text-text-secondary whitespace-pre-wrap font-mono leading-[1.8] selection:bg-brand-primary selection:text-black">
                  {prompt.prompt_text}
                </pre>
              </div>
            </div>
            
            <div className="p-5 border-t border-white/5 bg-surface-card/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs font-mono text-text-muted flex gap-4 w-full sm:w-auto justify-between sm:justify-start">
                 <span>ID:{prompt.id.toString().padStart(3, '0')}</span>
                 <span>{prompt.copy_count} RUNS</span>
              </div>
              
              <button 
                onClick={handleCopy}
                className={`w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 font-bold uppercase tracking-[0.15em] text-xs transition-all cursor-pointer border rounded-md
                  ${copied 
                    ? 'bg-brand-primary text-black border-brand-primary shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 text-text-primary border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
              >
                {copied ? <><Check size={16} strokeWidth={2.5} /> EXTRACTED</> : <><Copy size={16} /> EXTRACT</>}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}