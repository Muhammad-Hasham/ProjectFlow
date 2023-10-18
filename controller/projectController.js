const Project= require("../model/projectModel");
const AppError=require("../utils/appError");
const catchAsync=require("../utils/catchAsync");


exports.CreateProject=catchAsync(async (req,res,next)=>{
    const project=await Project.create(req.body);
        res.status(201).json({
            status:'success',
            data:{
                data:project
            }
        });
})


exports.getParticularProject=catchAsync(async (req,res,next)=>{
    let project = await Project.findById(req.params.id);

    if(!project){
        return next(new AppError('No project Found with that ID',404))
    }

    res.status(200).json({
        status:'success',
        data:{
            project
        }
    });
})


exports.UpdateProject=catchAsync(async (req,res,next)=>{
    const project=await Project.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators: true 
    });

    if(!project){
        return next(new AppError('No project Found with that ID',404))
    }
    res.status(200).json({
        status:'success',
        data:{
          data:project
        }
    })
})


exports.DeleteProject=catchAsync(async (req,res,next)=>{
    const project=await Project.findByIdAndDelete(req.params.id);
        if(!project){
            return next(new AppError('No project Found with that ID',404))
        }
        res.status(204).json({  
            status:'success',
            data:null
        })
})
