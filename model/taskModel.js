const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Task must have name'],  
    },
    description:{
        type:String,
        required:[true,'Please Provide Task Description']
    },
    start_date:{
        type:Date,
        required:[true,'Task Must have start Date']
    },
    end_date:{
        type:Date,
        required:[true,'Task Must have end Date']
    },
    last_updation_date:{
        type:Date
    },
    project_manager_id:{
        type: mongoose.Schema.ObjectId,   
        ref: "User",
    },
    assignee:{
        type: mongoose.Schema.ObjectId,   
        ref: "User",
    },
    priority:{
        type:String,
        required:[true,'Task must have priority'],
        enum: ['low','medium','high']
    },
    status:{
        type:String,
        enum: ['todo','on-track','done']
    }
})

const Task= mongoose.model('Task',taskSchema);
module.exports=Task;