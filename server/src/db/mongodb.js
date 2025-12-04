import mongoose from 'mongoose';
import { dbName } from '../constants.js';

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log('MongoDB connection Error!!', error);
        
    }
}

export default connectDB