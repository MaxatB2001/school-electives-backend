const { Router } = require("express");
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js")
const multer = require("multer");
const { storage } = require("../utils/file.js");

const router = Router()
const upload = multer({ storage })

router.post("/registration", upload.single('avatar'),userController.registration)
router.get("/getStudentGrades", authMiddleware, userController.getStudentGrades)
router.post("/login", userController.login)
router.get("/journal/:id", authMiddleware, userController.getCourseJournal)
router.get("/schedule/:date", authMiddleware, userController.getUserSchedule)
router.post("/checkAuth", authMiddleware, userController.checkAuth)
router.get("/:id", authMiddleware, userController.getUser)


module.exports = router;