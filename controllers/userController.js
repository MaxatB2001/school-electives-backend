const ApiError = require("../exeptions/apiError.js");
const userService = require("../services/userService.js");

class UserController {
  async registration(req, res, next) {
    console.log(req.file.filename);
    try {
      const user = await userService.registration({
        ...req.body,
        image: req.file.filename,
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async getUser(req, res, next) {
    try {
      const { id } = req.user;
      const user = await userService.getUser(id);
      res.json(user);
    } catch (error) {
      next(ApiError.BadRequest("bad request"));
    }
  }
  async getUserSchedule(req, res, next) {
    const { date } = req.params;
    const schedule = await userService.getUserSchedule(req.user.id, date);
    res.json(schedule);
  }
  async login(req, res, next) {
    try {
      const user = await userService.login(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async checkAuth(req, res, next) {
    try {
      const token = await userService.checkAuth(req.user);
      res.json({ token });
    } catch (error) {
      console.log(error);
      next(ApiError.UnauthorizedError());
    }
  }

  async getCourseJournal(req, res, next) {
    const journal = await userService.getCourseJournal(
      req.params.id,
      req.query.classNumber,
      req.query.classLetter
    );
    res.json(journal);
  }

  async getStudentGrades(req, res, next) {
    const grades = await userService.getStudentGrades(req.user.id);
    res.json(grades);
  }
}

module.exports = new UserController();
