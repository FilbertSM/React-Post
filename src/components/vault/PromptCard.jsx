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
      <div className="bg-surface-card border border-text-secondary/30 rounded-lg overflow-hidden flex flex-col transition-all hover:border-brand-primary/50 group h-[420px]">
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-text-secondary/30 flex justify-between items-start bg-[#12161c]">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-text-primary font-semibold text-lg truncate">{prompt.title}</h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {aiModels.map((model, idx) => (
                <span key={idx} className="text-[10px] uppercase font-bold tracking-wider text-brand-primary border border-brand-primary/30 px-1.5 py-0.5 rounded-sm bg-brand-primary/10 whitespace-nowrap">
                  {model}
                </span>
              ))}
              <span className="text-xs text-text-secondary flex items-center gap-1 truncate">
                <Hash size={12} className="flex-shrink-0" /> {categories.join(', ')}
              </span>
            </div>
          </div>
          <div className="text-xs text-text-secondary font-mono flex flex-col items-end flex-shrink-0 w-[60px]">
            <span>ID:{prompt.id.toString().padStart(3, '0')}</span>
            <span className="text-brand-primary/70">{prompt.copy_count} runs</span>
          </div>
        </div>

        {/* Image Handling */}
        {prompt.imageUrl ? (
          <div className="w-full h-32 border-b border-text-secondary/30 flex-shrink-0">
            <img 
              src={prompt.imageUrl} 
              alt={prompt.title} 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-32 border-b border-text-secondary/30 flex-shrink-0 bg-surface-bg/30 flex items-center justify-center text-text-secondary/30 font-mono text-sm">
            [ NO IMAGE DATA ]
          </div>
        )}

        {/* Body: Payload pure raw text */}
        <div className="p-4 flex-grow bg-surface-bg/50 overflow-hidden relative">
          <pre className="text-sm text-text-primary/90 whitespace-pre-wrap font-mono leading-relaxed line-clamp-4">
            {prompt.prompt_text}
          </pre>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute top-2 right-2 p-1.5 bg-surface-bg border border-text-secondary/30 rounded text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-colors opacity-0 group-hover:opacity-100"
            title="Inspect Prompt"
          >
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Footer / Interaction */}
        <div className="p-3 border-t border-text-secondary/30 bg-[#12161c] flex-shrink-0">
          <button 
            onClick={handleCopy}
            className={`w-full py-2 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs border transition-all cursor-pointer rounded-sm
              ${copied 
                ? 'bg-brand-primary text-surface-bg border-brand-primary' 
                : 'bg-transparent text-text-primary border-text-secondary/50 hover:border-brand-primary hover:text-brand-primary'
              }`}
          >
            {copied ? (
              <>
                <Check size={16} /> [ COPIED ]
              </>
            ) : (
              <>
                <Copy size={16} /> [ COPY PAYLOAD ]
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal for Full Prompt */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12161c] border border-brand-primary/50 rounded-lg w-full max-w-2xl flex flex-col max-h-[90vh] shadow-2xl">
            <div className="p-4 border-b border-text-secondary/30 flex justify-between items-center">
              <h2 className="text-brand-primary font-bold text-lg font-mono">_INSPECT_PAYLOAD: {prompt.title}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <pre className="text-sm text-text-primary whitespace-pre-wrap font-mono leading-relaxed bg-surface-bg p-4 rounded border border-text-secondary/20">
                {prompt.prompt_text}
              </pre>
            </div>
            <div className="p-4 border-t border-text-secondary/30 bg-surface-card flex justify-end">
              <button 
                onClick={handleCopy}
                className={`px-6 py-2 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs border transition-all cursor-pointer rounded-sm
                  ${copied 
                    ? 'bg-brand-primary text-surface-bg border-brand-primary' 
                    : 'bg-brand-primary/10 text-brand-primary border-brand-primary/50 hover:bg-brand-primary hover:text-black'
                  }`}
              >
                {copied ? <><Check size={16} /> COPIED</> : <><Copy size={16} /> COPY</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}