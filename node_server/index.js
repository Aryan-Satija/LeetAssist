const express = require('express');
const dotenv = require('dotenv');
const {connect} = require('./config/database.js');
const gameRoutes = require('./routes/games.js');
const userRoutes = require('./routes/users.js')
const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 4000;
connect();

app.use('/games', gameRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res)=>{
    return res.json({
        success: true,
        message: `Server is running at ${PORT}`
    })
});

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})
