const express = require("express");
const router = express.Router();
const Tasks = require("../models/tasks.model");
const User = require("../models/users.model");


router.post("/",async(req,res)=>{
    const userId = req.user;
    try{
        const user = await User.findById(userId);
        const task = await Tasks.create({
            ...req.body,
            owner:userId
        });
        user.tasks.push(task);
        await user.save();
        res.status(201).json({message:"Task Created Successfully!"});
    }catch(err){
        res.status(500).json(err.message);
    }
})

// edit task on the user 
router.put("/:taskId",async(req,res)=>{
    const updatedData = req.body;
    const {taskId} = req.params;
    try{
        const task = await Tasks.findByIdAndUpdate(taskId,
            updatedData,
            {new: true,
            runValidators: true
        })
        if(!task){
            return res.status(404).json({ message: 'Task not found' });
          }
          res.status(201).json(task);
    }catch(err){
        res.status(403).json({error:err.message});
    }

})

//delete task from the user 
router.delete("/:taskId",async(req,res)=>{
    const userId = req.user;
    const {taskId} = req.params;
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { tasks: taskId } }, // Removes taskId from tasks array
            { new: true } // Return the updated document
        );
        
        const task = await Tasks.findByIdAndDelete(taskId);
        if(!task){return res.status(403).json({message:"Task not Found"})}
        res.status(204).json({message:"Task Deleted!!"})
    }catch(err){
        res.status(403).json({error:err.message});
    }
})


//get all tasks with their owner name
router.get("/all",async(req,res)=>{
    try{
        const tasks = await Tasks.find().populate({
            path:"owner",
            select:"name -_id"
        });
        res.status(201).json(tasks);
    }catch(err){
    res.status(403).json({error:err.message});
    }
})


//get all tasks for authenticated user
router.get("/",async(req,res)=>{
    const userId = req.user;
    try{
        const user = await User.findById(userId).populate({
            path:"tasks",
            select:"-owner"
        });
        const userTasks = user.tasks;
        res.status(201).json(userTasks)
    }catch(err){
        res.status(403).json({error:err.message});

    }
})


module.exports = router;