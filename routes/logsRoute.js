const express = require("express");
const logsController = require("../controller/LogController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    logsController.getAllLogs
  );

router
  .route("/names")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    logsController.getUserNamesFromLogs
  )

module.exports = router;
