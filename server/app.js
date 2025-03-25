import express from 'express';
import cors from 'cors';

import userRoutes from './routes/UserRoutes.js';
import authRoutes from "./routes/AuthRoutes.js";
import chatRoutes from "./routes/ChatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

export default app;
