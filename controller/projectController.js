const Project= require("../model/projectModel");
const AppError=require("../utils/appError");
const catchAsync=require("../utils/catchAsync");


exports.CreateProject=catchAsync(async (req,res,next)=>{
    const projectData = {
        ...req.body,
        project_manager: req.user.id
    };
    
    const project=await Project.create(projectData);
        res.status(201).json({
            status:'success',
            data:{
                data:project
            }
        });
})

exports.getAllProjects=async(req,res,next)=>{

    let filter={};
    if(req.params.userId) filter= { project_manager:req.params.userId}
    
    try{
    const projects = await Project.find(filter);
    res.status(200).json({
        status:"success",
        results: projects.length, 
        data:{
            projects
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

exports.getParticularProject=catchAsync(async (req,res,next)=>{
    let project = await Project.findById(req.params.id).populate({
        path: 'stories',
        select: 'description'
      });

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
