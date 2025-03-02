import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import userRoute from './routes/auth.routes.js';
import dashboardRoute from './routes/dashboard.routes.js';
import cookieParser from 'cookie-parser';
import settingsRoute from './routes/settings.routes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true}));
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ limit: '20mb' ,extended: true }));
app.use(cookieParser());

app.use('/api/auth',userRoute);
app.use('/api/dashboard',dashboardRoute)
app.use('/api/settings',settingsRoute);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})