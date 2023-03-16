const courseService =  require("../services/courseService.js");

class CourseController {
  async create(req, res, next) {
    const course = await courseService.create(req.body, req.user.id, req.file.filename);
    return res.json(course);
  }

  async joinToCourse(req, res, next) {
    const { id } = req.params;
    console.log(req.user.id);
    await courseService.joinToCourse(req.user.id, id);
    res.json({});
  }

  async leaveCourse(req, res, next) {
    const { id } = req.params;
    await courseService.leaveCourse(req.user.id, id)
    res.json({})
  }
  
  async getCourses(req, res, next) {
    console.log("s");
    const courses = await courseService.getCourses();
    res.json(courses)
  }

  async getCourse(req, res, next) {
    const { id } = req.params;
    const course = await courseService.getCourse(id);
    res.json(course);
  }

  async addHomework(req, res, next) {
    const { id } = req.params;
    const { body, date } = req.body;
    await courseService.addHomework(id, body, date);
    res.json({});
  }

  async updateGrade(req, res, next) {
    const {id} = req.params;
    const {grade} = req.body;
    try {
      courseService.updateGrade(id, grade)
      res.json("good")
    } catch(e) {
      res.json("bad").status(400)
    }
  }

  async addMaterial(req, res, next) {
    const {id} = req.params;
    const {name} = req.body
    const material = await courseService.addMaterial(id, name, req.file.filename)
    res.json({material})
  }

  async getCoursesWithMaterials(req, res, next) {
    console.log(req.user);
    const courses = await courseService.getCoursesWithMaterials(req.user);
    res.json(courses)
  }
}

module.exports =  new CourseController();
