const app = require('./app.js');
const connectDB = require('./data/data.js')

connectDB();

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
})
