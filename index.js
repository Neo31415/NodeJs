const Joi = require('joi');
const express = require("express");
const app = express();
app.use(express.json());


let courses = [
    {"id" : 1, "name" : "maths"},
    {"id" : 2, "name" : "english"},
    {"id" : 3, "name" : "hindi"}
];


// get hello world on browser
app.get("/",(req,res)=>{
    res.send("hello World!");
});

// get all the courses
app.get("/api/courses",(req,res)=>{
    res.send(courses);
});

// get a specific course 
app.get("/api/courses/:id",(req,res)=>{
    let course = courses.find((c)=>{return c.id == req.params.id})
    if(!course)
        res.status(404).send("course do not found!");
    res.send(course);
});


// post a course
app.post("/api/courses/",(req,res)=>{
    const schema = {
        "name" : Joi.string().min(3)
    };
    let result = Joi.validate(req.body,schema);

    if(result.error)
        res.send(result.error.details[0].message);
    else{
        let course = {
            id : courses.length+1,
            name : req.body.name 
        };
        courses.push(course);
        res.send(courses);
    }
});

// edit a course 

app.put("/api/courses/:id",(req,res)=>{
    // getting the course 
    let course = courses.find(c=>{return c.id == req.params.id});
    // validating the body data 
    let schema = {
        "name" : Joi.string().min(3)
    };
    let result = Joi.validate(req.body,schema);
    // updating
    if(result.error)
        res.status(400).send(result.error.details[0].message)
    else{
        course.name = req.body.name;
        res.status(200).send(courses);
    }

});


app.listen(3000,()=>{console.log("listening to port 3000")});

