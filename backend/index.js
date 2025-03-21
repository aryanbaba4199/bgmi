const express = require('express');
const cors = require('cors');
const db = require('./utils/db')
const matchRoutes = require('./routes/matchRoutes');
const userRoutes = require('./routes/userRoutes');
const verifyToken = require('./utils/verification')
const errorHandler = require('./utils/errorHandler')

require('dotenv').config;

const app = express();

db();
app.use(cors());
app.use(express.json());
app.use('/matches', verifyToken, matchRoutes)
app.use('/users', userRoutes)
app.get('/', (req, res)=>{
    res.send('Hello frin server!');
})
app.use(errorHandler)


app.listen(5000, ()=>{
    console.log('Server listening on ', 5000)
})