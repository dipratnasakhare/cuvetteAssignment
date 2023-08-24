const express = require('express');
const PostsRouter = require('./routes/posts');
const AuthRouter = require('./routes/auth');
const cors = require("cors")
const {sequelize,connectToDb} = require('./db');
const body_parser = require('body-parser');

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3001;

app.use(express.json());
app.use('/api', PostsRouter);
app.use('/api', AuthRouter);


app.get('/api/get/',(request,response)=>{
    response.status(200).json({message:"Hello World"})
})

app.listen(PORT , async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectToDb();
})