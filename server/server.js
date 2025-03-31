const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./route/authRoutes');
const connectDB = require('./utils/connectDB');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173'||'https://aqua-meter2025.vercel.app/',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/',()=>{
    res.send('Server is running');
})
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});