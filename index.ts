import "dotenv/config";
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from './routes/auth';
import financialReportRoutes from './routes/financialReport';
import presetReportRoutes from './routes/presetReport';
import userRoutes from './routes/user';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI!;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/financial-report', financialReportRoutes);
app.use('/api/preset-report', presetReportRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(MONGODB_URI, {}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
  });
});