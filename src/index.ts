import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import authRoutes from './routes/auth.js';
import financialReportRoutes from './routes/financialReport.js';
import presetReportRoutes from './routes/presetReport.js';
import userRoutes from './routes/user.js';

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

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    // FastAPI log style: [timestamp] "METHOD PATH" status_code duration
    const log = [
      `[${new Date().toISOString()}]`,
      `"${req.method} ${req.originalUrl}"`,
      res.statusCode,
      `${duration}ms`
    ].join(' ');
    console.log(log);
  });
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/financial-report', financialReportRoutes);
app.use('/api/preset-report', presetReportRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

mongoose.connect(MONGODB_URI, {}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
  });
});