const { Router } = require("express");
const InterestController = require("../controllers/interest.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const interestRoutes = Router();

interestRoutes
  .get("/", InterestController.getAllInterests)
  .post("/", auth, authAdmin, InterestController.createInterest)
  .delete("/:id", auth, authAdmin, InterestController.deleteInterest);

module.exports = interestRoutes;
