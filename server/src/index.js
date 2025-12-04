import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

// Initialize Express 
const app = express();



// Middlewares
app.use(cors());

// Routes

app.get('/', ( req, res) =>{
        res.send("API Working")
    }
)

// port

const PORT = process.env.PORT = 8000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    
})