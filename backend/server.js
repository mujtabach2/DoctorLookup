import express from "express"
import cors from "cors"
import doctors from "./api/doctors.route.js"



const app = express()

app.use(cors())
app.use(express.json())


app.use("/api/v1/doctors", doctors)
app.use("*",(req,res) => res.status(404).json({error: "not found"}))

app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
  
export default app

   


  