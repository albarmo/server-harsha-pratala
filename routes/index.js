const router = require("express").Router();
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");

router.use("/user", userRouter);
router.use("/article", articleRouter);

module.exports = router;
