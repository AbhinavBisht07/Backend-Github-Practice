import express from "express"
import morgan from "morgan"

const app = express();

app.use(morgan("dev"));
app.use(express.json());


app.get("/", (req,res) => {
    let sum = 0;
    for (let i = 1; i <= 100000000; i++){
        sum += i;
    }
    res.status(200).json({ message: `Hello guys !! ... The sum is: ${sum}` });
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});