const tagsRouter = require("express").Router();
const tagsController = require("../controllers/tagControllers");

tagsRouter.get("/", tagsController.list);
tagsRouter.post("/", tagsController.create);
tagsRouter.put("/:id", tagsController.update);
tagsRouter.delete("/:id", tagsController.delete);

module.exports = tagsRouter;
