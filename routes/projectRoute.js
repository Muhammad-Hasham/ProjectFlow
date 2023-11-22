const express=require('express');
const projectController=require("../controller/projectController");
const authController=require("../controller/authController")

const router=express.Router({mergeParams:true}) 

const storyRouter=require("../routes/userStoryRoute");

router.use('/:projectId/stories',storyRouter)

router
   .route('/')
   .get(authController.protect,authController.restrictTo('Project Manager'),projectController.getAllProjects)
   .post(authController.protect,authController.restrictTo('Project Manager'),projectController.CreateProject);

router
   .route('/:id')
   .get(
    authController.protect,
    projectController.getParticularProject
    )
   .patch(
      authController.protect,
      authController.restrictTo('Project Manager'),
      projectController.UpdateProject
      )
   .delete(
      authController.protect,
      authController.restrictTo('Project Manager'),
      projectController.DeleteProject
      );



module.exports=router;