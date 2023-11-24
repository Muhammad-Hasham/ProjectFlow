const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'A user must have name'],  
    },
    description:{
        type:String,
        required:[true,'Please Provide Project Description']
    },
    start_date:{
        type:Date,
        required:[true,'Project Must have start Date']
    },
    end_date:{
        type:Date,
        required:[true,'Project Must have end Date']
    },
    project_manager_id:{
        type: mongoose.Schema.ObjectId,   
        ref: "User",
    },
    Members:[
        {
            type: mongoose.Schema.ObjectId,   
            ref: "User"
        }
    ]
})

const Project= mongoose.model('Project',projectSchema);
module.exports=Project;