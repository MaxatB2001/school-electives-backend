const { Router } = require("express");
const courseController = require("../controllers/courseController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const multer = require("multer");
const { storage } = require("../utils/file.js");

const router = Router()
const upload = multer({ storage })
router.post("/create", authMiddleware, upload.single("image"),courseController.create)
router.get("/getCourses", courseController.getCourses)
router.post("/leaveCourse/:id", authMiddleware, courseController.leaveCourse)
router.get("/getCoursesWithMaterials", authMiddleware, courseController.getCoursesWithMaterials)
router.post("/updateGrade/:id", courseController.updateGrade)
router.post("/addMaterial/:id", upload.single("material"), courseController.addMaterial)
router.get("/:id", courseController.getCourse)
router.post("/joinToCourse/:id", authMiddleware, courseController.joinToCourse)
router.post("/addHomework/:id", courseController.addHomework)
module.exports = router;