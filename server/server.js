//initialised a express server in type module format
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//initialised a route for the login page
app.get('/', (req, res) => {
    res.send('Server is working');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});