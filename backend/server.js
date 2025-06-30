import express from 'express';
import cors from 'cors';
import commentRouter from './routes/commentRoutes.js';
import postRouter from './routes/postRoutes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});