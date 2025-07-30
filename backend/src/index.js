import express from 'express'
import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes';


const app=express();
const PORT=process.env.PORT;

app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRouter)

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    
})