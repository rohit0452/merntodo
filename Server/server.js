// Import
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const Todo = require("./models/todo")
const todo = require("./models/todo")

const PORT = process.env.PORT || 3001

// uses
const app = express();
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors());
app.use(express.json());

// Mongodb Connectivity
const url = "mongodb://127.0.0.1:27017/mern-todo";
mongoose.connect(url , {
    useNewUrlParser : true ,
    useUnifiedTopology : true
}).then(()=> console.log("Connection Established"))
.catch(()=> console.log("Database Couldnt connect"))



// Routes

app.get("/todos", async(req,res) =>{
    const data = await Todo.find();
    res.json(data);
});

// Add a Todo

app.post("/todo/add", (req,res)=>{
    const todo = new Todo({
        title : req.body.title
    })
    todo.save();
    res.json(todo)
    // console.log(todo);
});

// Delete a Todo

app.delete("/todo/delete/:id", async(req,res)=>{
    const data = await Todo.findByIdAndDelete(req.params.id)
        
    res.json(data);
})

// Update a todo 

app.get("/todo/update/:id" , async(req,res)=>{
    const data =await Todo.findByIdAndUpdate(req.params.id);
    data.completed = !data.completed
    data.save()
    res.send(data);
})



//Server Started
try{
app.listen(PORT , ()=>{
    console.log("Server started on 3001")
})
}catch{
    console.log("Error In Server")
}