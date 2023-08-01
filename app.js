const express = require('express');
const config = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {errorMiddleware}= require('./middlewares/error')


const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');

const app = express();


config.config({ path: path.join(__dirname, 'data', 'config.env') });


//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true,
  }
));


//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);




app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use(errorMiddleware);

module.exports = app;
