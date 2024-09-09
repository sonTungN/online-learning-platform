const express = require("express");
const router = express.Router();

const learnerController = require("../app/controllers/LearnerController");

router.get("/order-placement", learnerController.order);

module.exports = router;
