// start server
// connect server to DB

require("dotenv").config() //ye sabse pehli line likhte hain server.js mein 
const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb();

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})