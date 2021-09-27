const vegetasiRouter = require("express").Router();
const vegetasiController = require("../controllers/vegetasiControllers");

vegetasiRouter.get("/", vegetasiController.list);
vegetasiRouter.post("/", vegetasiController.create);
vegetasiRouter.put("/:id", vegetasiController.update);
vegetasiRouter.delete("/:id", vegetasiController.delete);

module.exports = vegetasiRouter;
