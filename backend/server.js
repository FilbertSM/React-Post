import express from 'express';
import cors from 'cors';
import promptRouter from './routes/promptRoutes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Consolidating everything under /api/prompts
app.use('/api/prompts', promptRouter);

app.listen(PORT, () => {
    console.log(`[PromptVault] Backend Engine running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the PromptVault API! Try hitting /api/prompts' });
});