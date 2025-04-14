import "dotenv/config";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth';
import financialReportRoutes from './routes/financialReport';
import presetReportRoutes from './routes/presetReport';
import userRoutes from './routes/user';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI!;
const SIGNED_COOKIE_KEY = process.env.SIGNED_COOKIE

const app = express();

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(SIGNED_COOKIE_KEY));

app.use('/api/auth', authRoutes);
app.use('/api/financial-report', financialReportRoutes);
app.use('/api/preset-report', presetReportRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(MONGODB_URI, {}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
  });
});