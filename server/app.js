import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/AuthRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
