const Task= require("../model/taskModel");
const AppError=require("../utils/appError");
const catchAsync=require("../utils/catchAsync");

exports.CreateTask=catchAsync(async (req,res,next)=>{
   
    if(!req.body.story) {
        req.body.story=req.params.storyId
    }
    
    const task=await Task.create(req.body);
        res.status(201).json({
            status:'success',
            data:{
                data:task
            }
        });
})

exports.getAllTasks=async(req,res,next)=>{

    let filter={};
        if(req.params.storyId){
            filter={story:req.params.storyId};
        }
    
    try{
    const tasks = await Task.find(filter);
    res.status(200).json({
        status:"success",
        results: tasks.length, 
        data:{
            tasks
        } 
    })
    }
    catch(err)
    {
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
}

exports.getTask=catchAsync(async(req,res,next)=>{

    const task = await Task.findById(req.params.id).populate({path:'subtasks', select:'description'});

    if(!task){
        return next(new AppError('No task Found with that ID',404))
    }

    res.status(200).json({
        status:'success',
        data:{
            task
        }
    });
})

exports.UpdateTask=catchAsync(async (req,res,next)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators: true 
    });

    if(!task){
        return next(new AppError('No task Found with that ID',404))
    }
    res.status(200).json({
        status:'success',
        data:{
          data:task
        }
    })
})


exports.DeleteTask=catchAsync(async (req,res,next)=>{
    const task=await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return next(new AppError('No task Found with that ID',404))
        }
        res.status(204).json({  
            status:'success',
            data:null
        })
})