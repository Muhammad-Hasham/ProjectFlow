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


projectSchema.virtual('week').get(function () {
    // Calculate the difference in milliseconds between endDate and startDate.
    const timeDifference = this.endDate - this.startDate;

    // Calculate the number of days between the current date and startDate.
    const currentDate = new Date();

    const daysDifference = Math.floor((currentDate - this.start_date) / (24 * 60 * 60 * 1000));

    // Calculate the number of weeks based on the days difference, considering a week has passed when 7 or more days have passed.
    const weeks = Math.floor(daysDifference / 7);

    return weeks;
});

projectSchema.virtual('tasks',{
    ref:"Task",
    foreignField:'project',
    localField: '_id'  
});

projectSchema.pre(/^find/,function(next){
    this.populate({
        path: 'Members', // name of field we want to populate
        select: '-__v -passwordChangedAt'  // fields we dont want in output/response. 
    })
    next();
})

const Project= mongoose.model('Project',projectSchema);
module.exports=Project;