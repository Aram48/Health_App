import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log(`Database Connected`);
    });
    await mongoose.connect(`${process.env.MOGODB_URI}/prescripto`);
}

export default connectDB