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
        default:Date.now,
    },
    end_date:{
        type:Date,
        required:[true,'Project Must have end Date']
    },
    project_manager:{
        type: mongoose.Schema.ObjectId,   
        ref: "User",
    },
    Members:[
        {
            type: mongoose.Schema.ObjectId,   
            ref: "User"
        }
    ],
},
{ 
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}); 

projectSchema.pre(/^find/,function(next){
    this.populate({
        path:'project_manager',
        select:'-__v'
    });
    next();
})


projectSchema.virtual('stories',{
    ref:"UserStory",
    foreignField:'project',
    localField: '_id'  
});

const Project= mongoose.model('Project',projectSchema);
module.exports=Project;