const articleRouter = require("express").Router();
const articleController = require("../controllers/articleControllers");

articleRouter.get("/", articleController.list);
articleRouter.post("/", articleController.create);
articleRouter.put("/:id", articleController.update);
articleRouter.delete("/:id", articleController.delete);

module.exports = articleRouter;
