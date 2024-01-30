const Project= require("../model/projectModel");
const AppError=require("../utils/appError");
const catchAsync=require("../utils/catchAsync");
const User=require("../model/userModel")
const nodemailer = require('nodemailer');
const fetchUserIdsByEmails = async (emailArray) => {
    const users = await User.find({ email: { $in: emailArray } });
    return users.map((user) => user._id);
  };
  
  exports.CreateProject = catchAsync(async (req, res, next) => {
    const projectData = {
      ...req.body,
      project_manager: req.user.id,
    };
  
    const project = await Project.create(projectData);
    let msg = "Project Created Successfully";
  
    if (req.body.member) {
      try {
        // Fetch user IDs based on the provided email addresses
        const memberIds = await fetchUserIdsByEmails(req.body.member);
  
        // Update the Members array in the project with user IDs
        project.Members = memberIds;
  
        // Save the project with updated Members
        await project.save();
        msg = "Project Created and members invited Successfully";
      } catch (error) {
        console.error("Error fetching user IDs:", error);
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    }
  
    console.log(msg);
    res.status(201).json({
      status: "success",
      data: {
        data: project,
        message: msg,
      },
    });
  });
  

exports.getAllProjects=async(req,res,next)=>{

    let filter={};
    let userExistsInMembers=null;
    if(req.params.userId) filter= { project_manager:req.params.userId}
    else filter = { Members: { $in: [req.user.id] } };
    
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
        path: 'tasks',
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

exports.pieStats=catchAsync(async (req,res,next)=>{
  const project = await Project.findById(req.params.id).populate('tasks');
  if (!project) {
    return res.status(404).json({
        status: "fail",
        message: "Project not found"
    });
  }
    const tasks = project.tasks;
    let todoCount = 0;
    let inProgressCount = 0;
    let completedCount = 0;
    tasks.forEach(task => {
      if (task.status === "todo") {
          todoCount++;
      } else if (task.status === "inProgress") {
          inProgressCount++;
      } else if (task.status === "completed") {
          completedCount++;
      }
  });

  console.log(tasks.length);

  const totalTasks = tasks.length;

  let todoPercentage=((todoCount/totalTasks)*100);
  let inProgressPercentage=((inProgressCount/totalTasks)*100);
  let completedPercentage=((completedCount/totalTasks)*100);
  console.log(todoPercentage,inProgressPercentage,completedPercentage);


  const response = {
    todo: todoPercentage,
    inProgress: inProgressPercentage,
    completed: completedPercentage,
    total: totalTasks,
    week: project.week
  };

  res.status(200).json({
      status: "success",
      data: response
  });
})



exports.lineStats=catchAsync(async (req,res,next)=>{
  const project = await Project.findById(req.params.id).populate('tasks');
  if (!project) {
    return res.status(404).json({
        status: "fail",
        message: "Project not found"
    });
  }
    const tasks = project.tasks;
    let todoCount = 0;
    let inProgressCount = 0;
    let completedCount = 0;
    tasks.forEach(task => {
      if (task.status === "todo") {
          todoCount++;
      } else if (task.status === "inProgress") {
          inProgressCount++;
      } else if (task.status === "completed") {
          completedCount++;
      }
  });

  console.log(tasks.length);

  const totalTasks = tasks.length;

  const response = {
    todo: todoCount,
    inProgress: inProgressCount,
    completed: completedCount,
    total: totalTasks,
    week: project.week
  };

  res.status(200).json({
      status: "success",
      data: response
  });
})



const path = require('path');

exports.sendInviteEmail = catchAsync(async (req, res, next) => {
  try {
    const { emails } = req.body;
    console.log('Received request body:', emails);

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ error: 'Invalid or missing email addresses in the request body' });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abdurrehman1891@gmail.com',
        pass: 'odimufgdnxnblsve',
      },
    });

    // Get the absolute path to the logo image (assuming it's in the same folder as your script)
    const logoPath = path.join(__dirname, 'ProjectFlow-Logo.png');

    // Attach the logo as an inline image with Content-ID
    const mailOptions = {
      from: 'a.hamza2317@gmail.com',
      to: emails.join(', '),
      subject: 'Invitation to Join Project Flow',
      html: `
        <div>
          <img src="cid:projectFlowLogo" alt="Project Flow Logo" style="width: 100px; height: 100px;">
          <h1>Welcome to Project Flow!</h1>
          <p>
            You are invited to join Project Flow, an AI-based Project Management tool. 
            Click the link below to accept the invitation and start managing your projects efficiently.
          </p>
          <a href="your_invitation_link" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">
            Accept Invitation
          </a>
        </div>
      `,
      attachments: [
        {
          filename: 'ProjectFlow-Logo.png',
          path: logoPath,
          cid: 'projectFlowLogo', // Content-ID for inline image
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Invite emails sent successfully' });
  } catch (error) {
    console.error('Error sending invite emails:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});