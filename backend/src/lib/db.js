import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection error:', error);
    }
}

export default connectDB;

