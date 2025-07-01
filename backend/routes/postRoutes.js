import { Router } from 'express';
const router = Router();

// Mock Data
const posts = [
  { id: 1, title: 'The Rise of AI', content: 'Artificial intelligence is transforming industries and reshaping our future.' },
  { id: 2, title: 'JavaScript Frameworks in 2024', content: 'A comprehensive overview of the most popular JavaScript frameworks.' },
  { id: 3, title: '10 Tips for a Healthier Life', content: 'Simple lifestyle changes that can improve your overall well-being.' },
  { id: 4, title: 'Traveling on a Budget', content: 'Explore the world without breaking the bank with these budget-friendly travel tips.' },
  { id: 5, title: 'The Future of Work', content: 'How remote work, automation, and the gig economy are changing the way we work.' },
  { id: 6, title: 'Sustainable Living', content: 'Practical tips for reducing your environmental impact and living a more sustainable lifestyle.' },
  { id: 7, title: 'The Power of Mindfulness', content: 'Learn how mindfulness can reduce stress, improve focus, and enhance your overall well-being.' },
  { id: 8, title: 'Investing for Beginners', content: 'A step-by-step guide to help you start investing and build your financial future.' },
  { id: 9, title: 'The Art of Communication', content: 'Effective communication skills for building stronger relationships and achieving your goals.' },
  { id: 10, title: 'The Benefits of Exercise', content: 'Discover the physical and mental health benefits of regular exercise.' }
];

const POSTS_PER_PAGE = 5;

router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = page * POSTS_PER_PAGE;

  const paginatedPosts = posts.slice(startIndex, endIndex);
  res.json({
    posts: paginatedPosts,
    total: posts.length,
    pages: Math.ceil(posts.length / POSTS_PER_PAGE)
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(post => post.id === parseInt(id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

export default router;
