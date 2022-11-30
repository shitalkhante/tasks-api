const express = require("express");
const app = express();
const mongo = require("mongoose");
const bodyparser = require("body-parser");
const task = require("./model.js");

mongo.connect("mongodb://localhost:27017/tasks", () => { console.log("connected to db") });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/POST/v1/tasks", (req, res) => {
    if(req.body.tasks){
        const record = req.body.tasks;
        console.log((record));
        task.insertMany(record,(err,reslt)=>{
            if(err){
                res.status(404).json({
                    error:err
                })
            }
            res.status(201).json({ 
                reslt
            })
      })
    }
    else{
    const record = req.body;
    task.create(record).then(result => {
        res.status(201).json({
            id: result._id
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
}
})

app.get("/GET/v1/tasks", (req, res) => {

    try {
        task.find({}, (err, reslt) => {
            if (err) { console.log(err); }
            else {
                res.status(200).json({
                    res: reslt
                })
            }
        });

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }

})
app.get("/GET/v1/tasks/:id", (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const result = task.findById(id,(err,resl)=>{
            if(err){
                res.status(404).json({
                    Error:"There is no task at that id"
                })
            }
            res.status(200).json({
            msg:resl
        })
        });
        
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})
app.delete("/DELETE/v1/tasks/:id",(req,res)=>{
    try {
        const id = req.params.id;
        const result = task.findOneAndDelete({_id:id},(err,ret)=>{
            if(err){
                res.status(204).json({
                    msg:"id not found"   
                   })
            }
            res.status(204).json({
             None:ret 
            })
        });
    } catch (error) {
        res.status(404).json({
            err:error
        })   
    }
})

app.delete("/DELETE/v1/tasks",(req,res)=>{
    const record = req.body.tasks;
    console.log((record));
    record.map((data)=>{
        task.deleteOne({_id:data.id})
    })
    // task.deleteMany()
    // task.deleteMany(record,(err,reslt)=>{
    //     if(err){
    //         res.status(404).json({
    //             error:err
    //         })
    //     }
//         res.status(201).json({ 
//             reslt
//         }) 
//   })
})

app.put("/PUT/v1/tasks/:id",(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        const data = req.body;
        const result = task.findOneAndUpdate({_id:id},data,{},(err,reslt)=>{
            if(err){
                res.status(404).json({
                    Error:"There is no task at that id"
                })
            }
             res.status(204).json({
            msg:reslt
        })
        });
       
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
})
app.post("/POST/v1/tasks", (req, res) => {
    
})

app.listen(8000, console.log("server is up on port 8000"));