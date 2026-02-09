// start server 
// connect to database

require("dotenv").config(); //the first line that we write on our server.js file
const app = require("./src/app");
const connectToDb = require("./src/config/database")


connectToDb()


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})