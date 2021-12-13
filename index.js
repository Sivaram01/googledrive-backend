
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/auth.js');
const cors = require('cors')
const cookieParser = require('cookie-parser')


dotenv.config();

const PORT = 8000;


//db connection
mongoose.connect(process.env.MONGO_URL, ()=> console.log("Database Connected"));



//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', routesUrls)


app.get('/', (request , response)=> {
  return response.send("Welcome");
})




// const user = [
//   {
//     "firstname" : "siva",
//     "lastname" : "ram",
//     "email": "sivaram@gmail.com",
//     "password": "password123",
//   }
// ]; 


app.listen(PORT, ()=> console.log("App is started in", PORT));