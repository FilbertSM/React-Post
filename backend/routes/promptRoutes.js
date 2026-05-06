import express from 'express';
import { validatePrompt } from './validatePrompt.js';

const router = express.Router();

let prompts = [
  {
    id: 1,
    title: "Cinematic Editorial Photography",
    prompt_text: "Cinematic editorial portrait of a young man in his early twenties standing motionless at the center of a moving crowd. Tousled curly dark brown hair falling over his forehead, piercing melancholic eyes staring directly into the camera, sharp jawline, fair skin with warm undertones, slightly parted lips. He wears a dark charcoal herringbone tweed blazer with subtle vertical pinstripes layered over an olive-green button-up shirt with the collar unbuttoned. Surrounding him, blurred silhouettes of commuters caught in heavy radial motion blur — heads, shoulders, hair streaking outward from the frame edges — while only he remains in perfect razor-sharp focus. Dimly lit underground subway station setting, atmospheric haze drifting through the air, moody desaturated teal-green color grade with warm amber highlights on his face. Deep crushed shadows, strong vignette around the corners, shallow depth of field, 35mm film aesthetic with subtle grain, cinematic overhead lighting. Mood of isolation, introspection, melancholy. Hyper-realistic photographic quality, fashion editorial style, vertical composition, no AI artifacts, zero plastic skin texture.",
    ai_model: ["Midjourney"],
    category: ["Photography", "Portrait"],
    copy_count: 789,
    imageUrl: "https://scontent-cgk1-2.cdninstagram.com/v/t51.82787-15/684213574_17883452616551243_5240380934755157760_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=Mzg4OTc0NDIxMDY5NDA0MjgxNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=xSEirXdQOu4Q7kNvwEjt2Rt&_nc_oc=AdqdDzPrI4egtjLbGB3YiLB1QTvPg5nahQU6Q2g7HBFzct7DnjRIUOBjoH25u8YsyXA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-cgk1-2.cdninstagram.com&_nc_gid=3ACknOz2YCgawNlj0eCSqw&_nc_ss=7a22e&oh=00_Af5yM2Ec8fsBtHV5TnckaF2LfvVLEODiqAwt9SLGEODXtA&oe=6A00FC12"
  },
  {
    id: 2,
    title: "Dockerizing Node.js Application",
    prompt_text: "Write a multi-stage Dockerfile for a production Node.js Express application. Ensure you optimize for build caching by separating package.json installation from source code copying. Include steps to run as a non-root user and use an alpine base image for the final stage.",
    ai_model: ["ChatGPT", "Claude"],
    category: ["DevOps", "Programming"],
    copy_count: 245,
    imageUrl: null
  },
  {
    id: 3,
    title: "Medical Case Study Analysis",
    prompt_text: "Act as an experienced diagnostician. Review the following patient symptoms, lab results, and history. Provide a differential diagnosis with top 3 possible conditions, explaining the physiological reasoning for each. Suggest follow-up tests required to confirm.",
    ai_model: ["Claude", "ChatGPT"],
    category: ["Medical", "Health"],
    copy_count: 142,
    imageUrl: null
  },
  {
    id: 4,
    title: "React Custom Hook for Fetching",
    prompt_text: "Create a custom React hook `useFetch` using TypeScript. It should take a URL and optional fetch parameters, and return an object containing `data`, `loading`, and `error` states. Ensure it handles race conditions if the component unmounts or the URL changes before the request completes, perhaps using an AbortController.",
    ai_model: ["Claude", "ChatGPT"],
    category: ["Frontend", "Programming"],
    copy_count: 312,
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Visual Branding Headphone Ad",
    prompt_text: "4:5 premium [BRAND] headphone ad, [MODEL TYPE] holding [HEADPHONE MODEL] toward camera, extreme foreground perspective, giant bold “[MAIN WORD]” typography, white background with [COLOR] rounded block, matte [COLOR] headphones, soft studio lighting, ultra-clean commercial layout, minimal soundwave graphics, luxury modern typography, ultra-sharp product focus, high-end tech campaign, 8K.",
    ai_model: ["Midjourney"],
    category: ["Advertising", "Product"],
    copy_count: 421,
    imageUrl: "https://scontent-cgk1-2.cdninstagram.com/v/t51.82787-15/686122121_17888342226474980_6750823213732835054_n.webp?_nc_cat=110&ig_cache_key=Mzg5MDgxODI1NTQ0NzM5MjQ1OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTEyMi5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=jycS-P5Qkf0Q7kNvwGmpuVZ&_nc_oc=Adq__rRto0cLJAKgXHdtYkzTFKXTOqEeLJVqNKhNgHxsfnxthYpelCgCaNobsXjmrUc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-cgk1-2.cdninstagram.com&_nc_gid=FOE4zTDaBF1xD3Lhgpe5JA&_nc_ss=7a22e&oh=00_Af62I7mpuaBYWqQR_ofktnjut4uQaNI_A6Rt1CQ4WHBC7g&oe=6A00ED1B"
  },
  {
    id: 6,
    title: "Daily Vlog Script & Storyboard",
    prompt_text: "Outline a 10-minute 'Day in the Life' YouTube vlog script. Include b-roll shot suggestions, timestamps, background music vibe recommendations, and talking points about productivity and maintaining a healthy work-life balance.",
    ai_model: ["ChatGPT"],
    category: ["Vlog", "Content Creation"],
    copy_count: 275,
    imageUrl: null
  },
  {
    id: 7,
    title: "Burger Poster for UMKM",
    prompt_text: "A bold and vibrant burger advertisement poster, featuring a large juicy cheeseburger in the center with glossy sesame bun, melted cheese dripping, crispy bacon strips, fresh lettuce, tomato slices, and red onion. The burger looks highly detailed, realistic, and mouth-watering with studio lighting and high contrast. Background is black and yellow with playful doodles (hearts, stars, lines) in white and red accents. Typography is big, rounded, and bold in yellow and white, saying “ALDI’S BURGER!” at the top. Include a small badge/logo above text. Add promotional elements like: red badge “BIG BROTHER” ribbon banner with text in Indonesian circular label “Soft, Delicious, Irresistible!” call-to-action button “AVAILABLE NOW!” Bottom section includes small icons and text like: “Quality Ingredients”, “Made Fresh Daily”, “Made With Love”. Style: modern fast food advertising, high contrast, glossy, vibrant colors, clean composition, commercial poster design, 4k, ultra detailed, sharp focus.",
    ai_model: ["Midjourney", "DALL-E"],
    category: ["Advertising", "Food"],
    copy_count: 532,
    imageUrl: "https://scontent-cgk1-2.cdninstagram.com/v/t51.82787-15/683675600_18063915152499882_8699033730592805991_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzg4NTk0NzIwNjk4MTg2MjY3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTAyNC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=Uv7kvoGUwBsQ7kNvwE1_r_9&_nc_oc=AdrDJBKJHz8Ivu0jLIICKuk__6TA9vRnBzNA3C7oijb7NZ5_-Iv7cUvS1L8fHjl0WZQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-cgk1-2.cdninstagram.com&_nc_gid=bZgyhhB63m9BdF3Zj69HjQ&_nc_ss=7a22e&oh=00_Af5kScJ8g12suCrRP_tMkGoeIjGb4zAGkOufG_26rC-v1Q&oe=6A00EF23"
  },
  {
    id: 8,
    title: "SQL Query Performance Tuning",
    prompt_text: "Analyze the following complex SQL query that joins 5 tables and uses window functions. Explain the potential performance bottlenecks. Propose a rewritten version utilizing CTEs (Common Table Expressions) and suggest the necessary indexes that should be added to the database to optimize its execution time.",
    ai_model: ["ChatGPT", "Claude"],
    category: ["Database", "Programming"],
    copy_count: 189,
    imageUrl: null
  },
  {
    id: 9,
    title: "Minimalist Kitchen Interior",
    prompt_text: "Interior design visualization of a modern minimalist kitchen. Matte black cabinetry, white marble countertops with subtle grey veining, brushed brass fixtures, and natural oak wood flooring. Natural light flooding in from large floor-to-ceiling windows showing a misty forest outside. 8k, photorealistic, architectural rendering.",
    ai_model: ["Midjourney"],
    category: ["Lifestyle", "Interior Design"],
    copy_count: 489,
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "BRAND WORLD / UNIVERSE",
    prompt_text: "Using the uploaded logo, create a highly detailed, cinematic “Brand World” poster. Transform the brand into a complete immersive universe — like a movie, game, or futuristic world built entirely from the logo’s identity. The brand becomes a WORLD: architecture, environments, objects, people, atmosphere. Vertical 4:5 poster. Create 4–6 smaller zones within the world. Turn brand elements into objects: logo shapes → architecture, colors → lighting / materials, patterns → environment textures. Like a AAA game environment or a luxury brand universe.",
    ai_model: ["ChatGPT", "DALL-E"],
    category: ["Branding", "Concept Art"],
    copy_count: 654,
    imageUrl: "https://scontent-cgk2-1.cdninstagram.com/v/t51.82787-15/684440295_17888878755473011_3159621127504805632_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=Mzg5MDM1NzEwMTUwNDIwNjM5MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4Ni5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=g89kPTQ_iX4Q7kNvwHmEuJP&_nc_oc=AdobzjeMADVDtA4DifTKjsGP6PyCV1asq68_8CL9nrGwr_V79OCVTFJ13OjFaJzWx-E&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-cgk2-1.cdninstagram.com&_nc_gid=4vVBWTkFkpovVXeCUScPVw&_nc_ss=7a22e&oh=00_Af6MdomM_Vb0R-jiUoxRy3yTJ4L5TQCa5Mb2mnF6nrurUA&oe=6A00E85F"
  },
  {
    id: 11,
    title: "Life Coaching Session Outline",
    prompt_text: "Design a 6-week life coaching curriculum focused on overcoming imposter syndrome. Provide week-by-week goals, journaling prompts, and actionable cognitive-behavioral exercises for the client to complete between sessions.",
    ai_model: ["Claude"],
    category: ["Life", "Psychology"],
    copy_count: 198,
    imageUrl: null
  },
  {
    id: 12,
    title: "Python Regex for Data Cleaning",
    prompt_text: "Write a Python script using the `re` module to clean a messy dataset of user inputs. The script needs to extract valid email addresses, normalize phone numbers into a standard (XXX) XXX-XXXX format, and remove any HTML tags present in the text fields. Provide unit tests using `pytest` to verify the regex patterns.",
    ai_model: ["Claude", "ChatGPT"],
    category: ["Data Science", "Programming"],
    copy_count: 405,
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 13,
    title: "High-Protein Meal Prep Plan",
    prompt_text: "Generate a 5-day high-protein meal prep plan targeting 180g of protein and 2000 calories per day. Focus on budget-friendly, easily accessible ingredients. Include a categorized grocery shopping list and step-by-step batch cooking instructions to minimize time in the kitchen.",
    ai_model: ["ChatGPT", "Gemini"],
    category: ["Food", "Health"],
    copy_count: 531,
    imageUrl: null
  },
  {
    id: 14,
    title: "Photobooth Vibe Webcam Photo",
    prompt_text: "Create a low-resolution vertical webcam photo in a 3x1 grid with a 3:4 aspect ratio using the character in the picture. The photo should fill the canvas without borders with photobooth vibe. The screen light is warm and dim, with a grainy/noisy style and a simple, cozy bedroom background. First grid: Exaggerated pout, finger near the lips, black off-shoulder top. Second grid: Shy/flirtatious tilt, soft expression. Third grid: romantic late-night pose, black off-shoulder top, hand near the mouth. The character's clothing and appearance are consistent.",
    ai_model: ["Midjourney", "Stable Diffusion"],
    category: ["Photography", "Social Media"],
    copy_count: 812,
    imageUrl: "https://scontent-cgk2-1.cdninstagram.com/v/t51.82787-15/688099063_18100804246886188_1552716829239611866_n.webp?_nc_cat=104&ig_cache_key=Mzg5MDg4NDU2ODI5OTk3MDcxOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTA4Ni5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=D8hB1Gr2Pn0Q7kNvwHrajLJ&_nc_oc=Adq2dP9NeyCAwBMsR-BIzFPUvYppeU_ieAPg6ojH2FjAglUSA_sfi2DIA9UdnxzWKBA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-cgk2-1.cdninstagram.com&_nc_gid=v7c3ONer1HO10iEbJi4HLw&_nc_ss=7a22e&oh=00_Af6W4ZbjG09mNL6pTrFOTX1Dd8g3TjPvSj5P43QN31P0fA&oe=6A00D369"
  },
  {
    id: 15,
    title: "Go REST API Middleware",
    prompt_text: "Implement a logging and authentication middleware in Go for a standard HTTP server using `net/http`. The middleware should log the incoming request method, path, and execution time. It should also verify a Bearer token in the Authorization header before allowing the request to proceed to the handler.",
    ai_model: ["ChatGPT"],
    category: ["Backend", "Programming"],
    copy_count: 120,
    imageUrl: null
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