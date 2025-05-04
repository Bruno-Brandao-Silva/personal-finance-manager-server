import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import authRoutes from './routes/auth.js';
import financialReportRoutes from './routes/financialReport.js';
import presetReportRoutes from './routes/presetReport.js';
import userRoutes from './routes/user.js';
import errorHandler from "./middlewares/error.js";
import logHandler from "./middlewares/log.js";

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

app.use(logHandler);

app.use('/api/auth', authRoutes);
app.use('/api/financial-report', financialReportRoutes);
app.use('/api/preset-report', presetReportRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res, next) => {
  next(new Error('Not Found'));
  // res.send('Hello World!');
})

app.use(errorHandler)
mongoose.connect(MONGODB_URI, {}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
  });
});