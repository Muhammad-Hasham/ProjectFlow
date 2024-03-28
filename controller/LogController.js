const Log= require('../model/LogModel');

exports.createLog=async(logData)=>{
    try {
        await Log.create(logData);
    } catch (error) {
        console.error("Error creating log:", error);
    }
}

exports.getAllLogs=async(req,res,next)=>{
    
    try{
    const logs = await Log.find();
    res.status(200).json({
        status:"success",
        results: logs.length, 
        data:{
            logs
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
