const express= require("express");
const app=express();
const path=require("path");
const bodyparser=require("body-parser");
//require('dotenv').config();


require("./db/conn");
const student = require("./models/students");
const Student = require("./models/students");

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const port= 8000;

app.get("/",(req,res) =>{
    res.send('hello from disha');
});


//create new students (1) with promises means then().catch()
// app.post("/students",(req,res)=>{
   
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
// });

//(2) method: with async await with try catch
app.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e);
    }
   
});

app.get("/students",async(req,res)=>{
    try{
        const studentsData =await Student.find();
        res.send(studentsData);
    }
    catch(e){
        res.send(e);
    }
});

app.get("/student/id/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        console.log(req.params); 
        //req.param fetches whole key value pair e.g. {id:'664c32bf5facba6e1918fa8a'} so for fetching e.g. req.param.id
        const studentData =await Student.findById(_id);
       
        if(!studentData){
            return res.status(404).send();
        }
        else{
            return res.send(studentData);
        }
    }
    catch(e){
        res.status(500).send(e);
    }
})


app.get("/student/email/:email",async(req,res)=>{
    try{
        const email=req.params.email;
        console.log(req.params.email); 
        //req.param fetches whole key value pair e.g. {id:'664c32bf5facba6e1918fa8a'} so for fetching e.g. req.param.id
        const studentDataByName =await Student.find({email:req.params.email});
       
        if(!studentDataByName){
            return res.status(404).send();
        }
        else{
            return res.status(201).send(studentDataByName);
            console.log(studentDataByName)
        }
    }
    catch(e){
        res.status(500).send(e);
    }
})
app.get("/student/name/:name",async(req,res)=>{
    try{
        const name=req.params.name;
        console.log(req.params); 
        const studentData1 =await Student.find({name:name});
       
        if(!studentData1){
            return res.status(404).send();
        }
        else{
            return res.status(200).send(studentData1);
        }
    }
    catch(e){
        res.status(500).send(e);
    }
})

app.patch("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const updateData =await Student.findByIdAndUpdate(_id,req.body,{new:true});
       
        // if(!updateData){
        //     return res.status(404).send();
        // }
        // else{
           res.send(updateData);
        // }
    }
    catch(e){
        res.status(400).send(e);
    }
})

app.delete("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const deleteData =await Student.findByIdAndDelete(req.params.id);
       
        if(!req.params.id){
            return res.status(400).send();
        }
       
           res.send(deleteData);
    
    }
    catch(e){
        res.status(500).send(e);
    }
})
















// app.get("/student/name/:name", async (req, res) => {
//     try {
//         const name = req.params.name;
        
//         // Query the database for an exact match of the name field
//         const studentDataByName1 = await Student.find({ name:name });

//         if (!studentDataByName1 || studentDataByName1.length === 0) {
//             return res.status(404).send();
//         } else {
//             console.log(studentDataByName1);
//             return res.status(200).send(studentDataByName1);
//         }
//     } catch (e) {
//         console.error(e);
//         return res.status(500).send(e);
//     }
// });





//below code for finding by name only works when schema has two different fields first name, last name
// app.get("/student/:name", async (req, res) => {
//     try {
//         const name = req.params.name;
//         // Split the name into first and last name
//         const [firstName, lastName] = name.split(' ');
        
//         // Assuming you have a schema where firstName and lastName are fields
//         const studentDataByName = await Student.find({ firstName, lastName });

//         if (!studentDataByName || studentDataByName.length === 0) {
//             return res.status(404).send();
//         } else {
//             console.log(studentDataByName);
//             return res.status(200).send(studentDataByName);
//         }
//     } catch (e) {
//         console.error(e);
//         return res.status(500).send(e);
//     }
// });

// app.get("/student/name/:name", async (req, res) => {
//     try {
//         const name = req.params.name;
        
//         // Construct a regular expression to match the full name
//         const regex = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
//         console.log(regex);
//         // Query the database using the regular expression on the 'name' field
//         const studentDataByName = await Student.find({ name: regex });

//         if (!studentDataByName || studentDataByName.length === 0) {
//             return res.status(404).send();
//         } else {
//             console.log(studentDataByName);
//             return res.status(200).send(studentDataByName);
//         }
//     } catch (e) {
//         console.error(e);
//         return res.status(500).send(e);
//     }
// });






app.listen(8000,()=>{
    console.log('connection is setup');
});