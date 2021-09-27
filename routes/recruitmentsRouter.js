const recruitmentRouter = require("express").Router();
const recruitmentController = require("../controllers/recruitmentControllers");

recruitmentRouter.get("/", recruitmentController.list);
recruitmentRouter.post("/", recruitmentController.create);
recruitmentRouter.put("/:id", recruitmentController.update);
recruitmentRouter.delete("/:id", recruitmentController.delete);

module.exports = recruitmentRouter;
