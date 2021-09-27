const topicsRouter = require("express").Router();
const topicsController = require("../controllers/topicControllers");

topicsRouter.get("/", topicsController.list);
topicsRouter.post("/", topicsController.create);
topicsRouter.put("/:id", topicsController.update);
topicsRouter.delete("/:id", topicsController.delete);

module.exports = topicsRouter;
