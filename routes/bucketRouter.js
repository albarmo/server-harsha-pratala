const bucketRouter = require("express").Router();
const bucketController = require("../controllers/bucketControllers");

bucketRouter.get("/", bucketController.getAllFile);
bucketRouter.get("/files", bucketController.getlistFile);
bucketRouter.get("/:id", bucketController.getFileById);
bucketRouter.post("/", bucketController.upload);
bucketRouter.delete("/:id", bucketController.delete);

module.exports = bucketRouter;
