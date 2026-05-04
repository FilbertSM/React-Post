import { z } from 'zod';

export const promptSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  prompt_text: z.string().min(10, "Prompt text must be at least 10 characters long."),
  ai_model: z.union([z.string(), z.array(z.string())]).transform(val => Array.isArray(val) ? val : [val]),
  category: z.union([z.string(), z.array(z.string())]).transform(val => Array.isArray(val) ? val : [val]),
  copy_count: z.number().int().nonnegative().optional().default(0),
  imageUrl: z.union([z.string().url("Must be a valid URL"), z.literal(""), z.null()]).optional()
});

export const validatePrompt = (req, res, next) => {
  try {
    const validatedData = promptSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    next(error);
  }
};