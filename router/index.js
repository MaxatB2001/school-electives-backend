const { Router } = require("express");
const userRouter = require("./userRouter.js")
const courseRouter = require ("./courseRouter.js")
const authMiddleware = require("../middlewares/authMiddleware.js")

const router = Router()
router.use("/user", userRouter)
router.use("/course", courseRouter)

module.exports = router;