import { Router } from 'express';
const router = Router();

// Mock Data
const comments = [
  { id: 1, postId: 1, author: 'Alice', text: 'This is the first comment on post 1.' },
  { id: 2, postId: 1, author: 'Bob', text: 'Great point! I agree with you.' },
  { id: 3, postId: 2, author: 'Charlie', text: 'Interesting perspective on JavaScript frameworks.' },
  { id: 4, postId: 2, author: 'David', text: 'I have a different opinion on this topic.' },
  { id: 5, postId: 3, author: 'Eve', text: 'These tips are very helpful. Thank you!' },
  { id: 6, postId: 3, author: 'Frank', text: 'I will definitely try these tips.' },
  { id: 7, postId: 4, author: 'Grace', text: 'Traveling on a budget is a great idea.' },
  { id: 8, postId: 4, author: 'Henry', text: 'I have some additional tips for budget travel.' }
];

router.get('/:postId', (req, res) => {
  const { postId } = req.params;
  const postComments = comments.filter(comment => comment.postId === parseInt(postId));
  if (postComments.length > 0) {
    res.json(postComments);
  } else {
    res.status(404).json({ error: 'Comments not found for this post' });
  }
});

export default router;
