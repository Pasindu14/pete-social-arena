import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL not found in the environment variables');
    }

    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB!');
        isConnected = true;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);

    }
}
