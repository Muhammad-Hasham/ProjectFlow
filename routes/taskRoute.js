const express=require('express');
const taskController=require("../controller/taskController");
const authController=require("../controller/authController")

const router=express.Router({mergeParams:true})

const subTaskRouter=require("../routes/subTaskRoute");

router.use('/:taskId/subTasks',subTaskRouter)

router
   .route('/')
   .get(authController.protect,authController.restrictTo('Project Manager'),taskController.getAllTasks)
   .post(authController.protect,authController.restrictTo('Project Manager'),taskController.CreateTask);

router
   .route('/:id')
   .get(taskController.getTask)
   .patch(
      authController.protect,
      authController.restrictTo('Project Manager'),
      taskController.UpdateTask
      )
   .delete(
      authController.protect,
      authController.restrictTo('Project Manager'),
      taskController.DeleteTask
      );

module.exports=router;