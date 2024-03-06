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
        // required:[true,'Task Must have end Date']
    },
    last_updation_date:{
        type:Date
    },
    assignee:{
       
        type: mongoose.Schema.ObjectId,   
        ref: "User",
        required:true
    },
    priority:{
        type:String,
        // required:[true,'Task must have priority'],
        enum: ['low','medium','high']
    },
    status:{
        type:String,
        default:"todo",
        // required:[true,'Task must have status'],
        enum: ['todo','inProgress','completed', 'overdue']
    },
    project_manager:{
        type: mongoose.Schema.ObjectId,   
        ref: "User",
    },
    pre_dependency:{
        type: mongoose.Schema.ObjectId,    
        ref: "Task",
        default:null
    },
    post_dependency:{
        type: mongoose.Schema.ObjectId,   
        ref: "Task",
        default:null
    },
    project:{
        type: mongoose.Schema.ObjectId,
        ref:'Project',
        // required:[true,'Task must belong to a Project']
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




taskSchema.pre(/^find/,function(next){
    this.populate({
        path: 'assignee', // name of field we want to populate
        select: '-__v -passwordChangedAt'  // fields we dont want in output/response. 
    })
    next();
})

const Task= mongoose.model('Task',taskSchema);
module.exports=Task;