require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoose.js");
const authenticateToken = require("./middlewares/authToken.middleware");

//importing the routes
const authRouter = require("./routes/auth.route.js");
const tasksRouter = require("./routes/tasks.route.js");


//initializing the app instance
const app = express();
const port = process.env.PORT || 8080;


//use middlewares on the entire app
app.use(express.json());
app.use(express.static("public"));
app.use(cors())



//redirecting to the api documentation
app.get("/",(req,res)=>{
    res.json("all g");
})

//using the routes we created
app.use("/",authRouter);
app.use("/tasks",authenticateToken,tasksRouter);


connectDB().then(()=>{
    app.listen(port,()=>{
    console.log("app started on port", port);
})
})