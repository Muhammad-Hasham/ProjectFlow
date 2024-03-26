const mongoose=require('mongoose');
const { createLog } = require('../controller/LogController');
const validator=require('validator');
const bcrypt= require('bcryptjs');

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'A user must have name'],  
    },
    email:{
        type:String,
        required:[true,'A user must have email'],
        unique:[true,'Email must be unique'],
        lowercase:true, 
        validate: [validator.isEmail,'Please provide valid email']
    },
    role: {
        type: String,
        enum: ['admin', 'Project Manager', 'Team Member','Client'],
        default: 'Member'
    },
    photo:{
        type:String,  
        default: 'default.jpg'
    }, 
    password:{
        type: String,
        required: [true,'Please provide a password'],
        minlength: 8,
        select:false 
    },
    passwordConfirm:{
        type: String,
        required: [true,'Please provide a password'],
        validate:{
            validator: function(el){
                return el === this.password; 
            },
            message:'Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires:Date,

    active:{
        type: Boolean,
        default: true,
        select: false 
    }
},
{ 
    // Schema options
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) {
        return next();
       }
    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined;
    next();
})


userSchema.virtual('projects',{
    ref:"Project",
    foreignField:'project_manager', 
    localField: '_id'
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp= parseInt(this.passwordChangedAt.getTime() / 1000, 10) 
        return JWTTimestamp < changedTimeStamp;
    }
    return false;
 }


userSchema.methods.createPasswordResetToken = function(){
    const resetToken= crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires=Date.now()+10*60*1000;
    return resetToken;
}

// Inside User Schema

// Pre hook for findOneAndUpdate to store original document
userSchema.pre('findOneAndUpdate', async function (next) {
    // Fetch and store the original document
    this._original = await this.model.findOne(this.getQuery());
    next();
});

// Post hook to create log after update or delete
userSchema.post(['findOneAndUpdate', 'findOneAndDelete'], async function (doc) {
    if (doc) {
        await createLog({
            prevData: this._original,
            newData: doc,
            updatedBy: doc.project_manager,
            userId: doc._id,
            typeofRequest: doc.isNew ? 'create' : 'update'
        });
    }
});


const User = mongoose.model('User',userSchema);

module.exports=User;