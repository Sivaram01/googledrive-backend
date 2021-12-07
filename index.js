const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();

const PORT = 8000;

const user = [
  {
    name : "siva",
    email: "sivaram@gmail.com"
  },
  {
    name : "prasanna",
    email: "prasanna@gmail.com"
  },
  {
    name : "rahul",
    email: "rahul@gmail.com"
  },
];

app.get("/", (request, response)=> {
  response.send("hello world")
})

app.get("/users" , (request , response)=>{
  response.send(user);
})

app.listen(PORT, ()=> console.log("App is started in", PORT));