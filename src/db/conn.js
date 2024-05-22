const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://disha:DKMongo%407555@cluster0.ssh4wdp.mongodb.net/student-api").then(()=>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log("no connection");
})