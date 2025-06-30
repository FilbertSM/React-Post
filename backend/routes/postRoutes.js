import { Router } from 'express';
const router = Router();

// Mock Data
const posts = {
  'tech': [
    { id: 1, title: 'The Rise of AI', content: '...' },
    { id: 2, title: 'JavaScript Frameworks in 2024', content: '...' }
  ],
  'lifestyle': [
    { id: 3, title: '10 Tips for a Healthier Life', content: '...' },
    { id: 4, title: 'Traveling on a Budget', content: '...' }
  ]
};

router.get('/:category', (req, res) => {
  const { category } = req.params;
  const postList = posts[category];
  if (postList) {
    res.json(postList);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

export default router;