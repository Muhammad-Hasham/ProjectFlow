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
        default:Date.now,
    },
    end_date:{
        type:Date,
        required:[true,'Task Must have end Date']
    },
    last_updation_date:{
        type:Date
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
        required:[true,'Task must have status'],
        enum: ['todo','on-track','done']
    },
    story:{
        type: mongoose.Schema.ObjectId,
        ref:'UserStory',
        required:[true,'Task must belong to a User-Story']
    },
},
{ 
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}); 


taskSchema.virtual('subtasks',{
    ref:"subTask",
    foreignField:'task',
    localField: '_id'  
});

const Task= mongoose.model('Task',taskSchema);
module.exports=Task;