import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mogodb.js';
import connectClodinary from './config/cloudinary.js';
import adminRoter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// app config

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectClodinary();

// middlewars

app.use(express.json());
app.use(cors());

// api endpoint

app.use('/api/admin', adminRoter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API working')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});