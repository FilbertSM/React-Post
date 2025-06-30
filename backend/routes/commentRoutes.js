import { Router } from 'express';
const router = Router();

// Mock Data
const comments = {
  '101': { author: 'Alice', text: 'This is the first comment.' },
  '102': { author: 'Bob', text: 'Great point!' }
};

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments[id];
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

export default router;