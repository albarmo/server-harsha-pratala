const router = require("express").Router();
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");
const tagsRouter = require("./tagsRouter");
const topicsRouter = require("./topicsRouter");
const feedbackRouter = require("./feedbackRouter");
const recruitmentRouter = require("./recruitmentsRouter");
const vegetasiRouter = require("./vegetasiRouter");
const bucketRouter = require("./bucketRouter");

router.use("/user", userRouter);
router.use("/article", articleRouter);
router.use("/tags", tagsRouter);
router.use("/topics", topicsRouter);
router.use("/feedback", feedbackRouter);
router.use("/recruitment", recruitmentRouter);
router.use("/vegetasi", vegetasiRouter);
router.use("/buckets", bucketRouter);

module.exports = router;
