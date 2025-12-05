import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkWebHooks } from './controllers/webhooks.controllers.js';
import connectDB from './db/mongodb.js';

dotenv.config({
    path: './.env'
})

// Initialize Express 
const app = express();

// Database Connection


// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.get('/', ( req, res) =>{
        res.send("API Working")
    }
);

app.post('/clerk', clerkWebHooks);

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