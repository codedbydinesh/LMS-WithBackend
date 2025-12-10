import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkWebHooks } from './controllers/webhooks.controllers.js';
import connectDB from './db/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';

dotenv.config({
    path: './.env'
})

// Initialize Express 
const app = express();

// Connection
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


// Routes

app.get('/', ( req, res) =>{
        res.send("API Working")
    }
);

// routes imports
import { educatorRouter} from './routes/educator.routes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';

// routes Declaration
app.post('/clerk', clerkWebHooks);
app.use('/api/v1/educator', educatorRouter);

// port

const PORT = process.env.PORT || 8000;

// Start the server and connect to DB
connectDB()
.then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.log("Failed to connect to DB", error);
})