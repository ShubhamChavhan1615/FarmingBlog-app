import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import indexRouter from './routes/index.js';
import { connectDB } from './db/db.js';
const app = express();
app.set("view engine", "ejs")
// Middleware
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
// app.use(cors());
// Allow requests from specific origins
const corsOptions = {
    origin: true,
    credentials: true,// Allow sending cookies from the client
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', indexRouter);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});