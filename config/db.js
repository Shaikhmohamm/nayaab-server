import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL)

        console.log('Database connection established')
    } catch (error) {
        // Log any errors that occur during connection
        console.log("Database connection error: " + error.message);
        // Terminate the application if a connection error occurs
        process.exit(1);
    }
};