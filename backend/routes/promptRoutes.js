import express from 'express';
import { validatePrompt } from './validatePrompt.js';

const router = express.Router();

let prompts = [
  {
    id: 1,
    title: "SaaS Landing Page Wireframe",
    prompt_text: "Act as an expert UX/UI designer. Generate a comprehensive wireframe and content structure for a modern B2B SaaS landing page targeting enterprise clients. Include a hero section with a strong VSB, features layout, social proof structure, and a conversion-optimized footer.",
    ai_model: ["ChatGPT", "Claude"],
    category: ["Design", "UI/UX"],
    copy_count: 142,
    imageUrl: null
  },
  {
    id: 2,
    title: "Cyberpunk Cityscape Background",
    prompt_text: "Cyberpunk neo-tokyo street level, neon signs reflecting in rain puddles, volumetric lighting, dense atmosphere, cinematic composition, shot on 35mm lens, 8k resolution, ultra detailed, octane render --ar 16:9",
    ai_model: ["Midjourney"],
    category: ["Image Generation"],
    copy_count: 385,
    imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "FastAPI Boilerplate Generator",
    prompt_text: "Write a production-ready FastAPI boilerplate. Include SQLAlchemy async setup, Alembic migrations configuration, Pydantic v2 schemas for user management, and JWT-based authentication stub. Ensure it follows a domain-driven folder structure.",
    ai_model: ["Claude", "ChatGPT"],
    category: ["Development", "Backend"],
    copy_count: 89,
    imageUrl: null
  },
  {
    id: 4,
    title: "Minimalist E-commerce Product Shot",
    prompt_text: "High-end product photography of a minimalist skincare bottle on a travertine stone podium. Soft natural sunlight casting artistic shadows. Neutral beige and terracotta color palette, depth of field, sharp focus on the product label. --ar 4:5 --v 6.0",
    ai_model: ["Midjourney", "Stable Diffusion"],
    category: ["Image Generation"],
    copy_count: 512,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "SQL Query Optimizer",
    prompt_text: "Review the following PostgreSQL query and suggest optimizations. Consider index usage, JOIN efficiency, and potential CTE refactoring for better readability and performance. Explain the 'why' behind each suggestion.",
    ai_model: ["ChatGPT"],
    category: ["Development", "Database"],
    copy_count: 67,
    imageUrl: null
  },
  {
    id: 6,
    title: "Conversion-Focused Cold Email",
    prompt_text: "Write a 3-part cold email sequence for a B2B lead generation agency. Keep the tone conversational, concise, and focused on the prospect's pain points. End with a soft call to action asking for 10 minutes of their time. Avoid standard marketing jargon.",
    ai_model: ["Claude"],
    category: ["Marketing", "Sales"],
    copy_count: 210,
    imageUrl: null
  },
  {
    id: 7,
    title: "Retro 80s Synthwave Poster",
    prompt_text: "Outrun aesthetic poster, glowing wireframe grid terrain, retro sun sinking behind a neon skyline, chrome text styling, deep magenta and cyan palette, VHS artifact effects, high contrast --ar 2:3",
    ai_model: ["Midjourney"],
    category: ["Image Generation", "Art"],
    copy_count: 420,
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "React Component Refactoring",
    prompt_text: "Refactor this messy React component. Convert class methods to custom hooks where appropriate, implement proper TypeScript interfaces for the props, and handle edge cases for loading and error states. Optimize for unnecessary re-renders.",
    ai_model: ["Claude", "Gemini"],
    category: ["Development", "Frontend"],
    copy_count: 156,
    imageUrl: null
  },
  {
    id: 9,
    title: "SEO Blog Post Outline",
    prompt_text: "Create an SEO-optimized blog post outline for the keyword 'best remote work tools 2024'. Include proposed H2s, H3s, target word count per section, and suggestions for LSI keywords. Ensure the structure naturally leads to an affiliate link CTA at the end.",
    ai_model: ["ChatGPT", "Claude"],
    category: ["Marketing", "SEO"],
    copy_count: 95,
    imageUrl: null
  },
  {
    id: 10,
    title: "Surreal Architectural Concept",
    prompt_text: "Brutalist architecture intertwined with overgrown hyper-realistic jungle flora. Monolithic concrete structures with cascading waterfalls. Soft overcast lighting, highly detailed textures, surreal mood, architectural visualization --ar 16:9 --style raw",
    ai_model: ["Midjourney", "DALL-E"],
    category: ["Image Generation", "Architecture"],
    copy_count: 188,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
  }
];

let nextId = prompts.length + 1;

// GET /api/prompts (with pagination and filtering)
router.get('/', (req, res) => {
  let { page, limit, search, model, category } = req.query;
  
  let result = [...prompts];

  // Filtering
  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(p => {
      const titleMatch = p.title && p.title.toLowerCase().includes(searchLower);
      const textMatch = p.prompt_text && p.prompt_text.toLowerCase().includes(searchLower);
      
      const modelMatch = Array.isArray(p.ai_model) 
        ? p.ai_model.some(m => m.toLowerCase().includes(searchLower))
        : (typeof p.ai_model === 'string' && p.ai_model.toLowerCase().includes(searchLower));
        
      const catMatch = Array.isArray(p.category)
        ? p.category.some(c => c.toLowerCase().includes(searchLower))
        : (typeof p.category === 'string' && p.category.toLowerCase().includes(searchLower));

      return titleMatch || textMatch || modelMatch || catMatch;
    });
  }
  
  if (model) {
    const modelLower = model.toLowerCase();
    result = result.filter(p => {
      if (Array.isArray(p.ai_model)) {
        return p.ai_model.some(m => m.toLowerCase() === modelLower);
      }
      return p.ai_model.toLowerCase() === modelLower;
    });
  }
  
  if (category) {
    const categoryLower = category.toLowerCase();
    result = result.filter(p => {
      if (Array.isArray(p.category)) {
        return p.category.some(c => c.toLowerCase() === categoryLower);
      }
      return p.category.toLowerCase() === categoryLower;
    });
  }

  // Pagination
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  if (!isNaN(pageNum) && !isNaN(limitNum) && pageNum > 0 && limitNum > 0) {
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    
    // Sort by id descending so newest is first
    result.sort((a, b) => b.id - a.id);
    
    const paginatedResult = result.slice(startIndex, endIndex);
    return res.json({
      data: paginatedResult,
      meta: {
        totalItems: result.length,
        currentPage: pageNum,
        totalPages: Math.ceil(result.length / limitNum),
        itemsPerPage: limitNum
      }
    });
  }

  // If no pagination, sort descending and return all
  result.sort((a, b) => b.id - a.id);
  res.json(result);
});

// GET /api/prompts/:id
router.get('/:id', (req, res) => {
  const prompt = prompts.find(p => p.id === parseInt(req.params.id, 10));
  if (!prompt) return res.status(404).json({ error: "Prompt not found" });
  res.json(prompt);
});

// POST /api/prompts
router.post('/', validatePrompt, (req, res) => {
  const newPrompt = {
    id: nextId++,
    ...req.body
  };
  prompts.push(newPrompt);
  res.status(201).json(newPrompt);
});

// PUT /api/prompts/:id
router.put('/:id', validatePrompt, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = prompts.findIndex(p => p.id === id);
  
  if (index === -1) return res.status(404).json({ error: "Prompt not found" });
  
  prompts[index] = {
    id,
    ...req.body
  };
  
  res.json(prompts[index]);
});

// PATCH /api/prompts/:id/copy
router.patch('/:id/copy', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const prompt = prompts.find(p => p.id === id);
  
  if (!prompt) return res.status(404).json({ error: "Prompt not found" });
  
  prompt.copy_count = (prompt.copy_count || 0) + 1;
  res.json({ message: "Copy count incremented", copy_count: prompt.copy_count });
});

// DELETE /api/prompts/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = prompts.findIndex(p => p.id === id);
  
  if (index === -1) return res.status(404).json({ error: "Prompt not found" });
  
  const deletedPrompt = prompts.splice(index, 1);
  res.json({ message: "Prompt deleted successfully", deleted: deletedPrompt[0] });
});

export default router;