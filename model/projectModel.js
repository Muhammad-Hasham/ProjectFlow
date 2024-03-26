const { createLog } = require('../controller/LogController');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have name'],
    },
    description: {
        type: String,
        required: [true, 'Please Provide Project Description']
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    end_date: {
        type: Date,
        required: [true, 'Project Must have end Date']
    },
    project_manager: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    Members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

projectSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'project_manager',
        select: '-__v'
    });
    next();
});

projectSchema.virtual('week').get(function () {
    const timeDifference = this.endDate - this.startDate;
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate - this.start_date) / (24 * 60 * 60 * 1000));
    const weeks = Math.floor(daysDifference / 7);
    return weeks;
});

projectSchema.virtual('tasks', {
    ref: "Task",
    foreignField: 'project',
    localField: '_id'
});

projectSchema.pre(/^find/,function(next){
    this.populate({
        path: 'Members', // name of field we want to populate
        select: '-__v -passwordChangedAt'  // fields we dont want in output/response. 
    })
    next();
})



// Pre hook for findOneAndUpdate to store original document
projectSchema.pre('findOneAndUpdate', async function (next) {
    // Fetch and store the original document
    this._original = await this.model.findOne(this.getQuery());
    next();
});

// Post hook to create log after update or delete
projectSchema.post(['findOneAndUpdate', 'findOneAndDelete'], async function (doc) {
    if (doc) {
        await createLog({
            prevData: this._original,
            newData: doc,
            updatedBy: doc.project_manager,
            projectId: doc._id,
            typeofRequest: doc.isNew ? 'create' : 'update'
        });
    }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
