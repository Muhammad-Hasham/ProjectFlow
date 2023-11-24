const express=require('express');
const projectController=require("../controller/projectController");
const authController=require("../controller/authController")

const router=express.Router();


router
   .route('/')
   .post(authController.protect,authController.restrictTo('manager'),projectController.CreateProject);

router
   .route('/:id')
   .get(
    authController.protect,
    projectController.getParticularProject
    )
   .patch(
      authController.protect,
      authController.restrictTo('manager'),
      projectController.UpdateProject
      )
   .delete(
      authController.protect,
      authController.restrictTo('manager'),
      projectController.DeleteProject
      );



module.exports=router;