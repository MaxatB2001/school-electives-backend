const prismaClient = require("../lib/prismaClient.js");
const { getDaysArray } = require("../utils/date.js");

class CourseService {
  async create(courseData, userId, image) {
    return await prismaClient.course.create({
      data: {
        ...courseData,
        days: JSON.parse(courseData.days),
        userId,
        image,
        audience: courseData.audience,
        classOriented: JSON.parse(courseData.classOriented),
        time: new Date(courseData.time),
      },
    });
  }

  async getCourses() {
    const courses = await prismaClient.course.findMany();
    return courses;
  }

  async joinToCourse(studentId, courseId) {
    const course = await prismaClient.course.findUnique({
      where: {
        id: courseId,
      },
    });
    const a = getDaysArray(course.startDate, course.endDate, course.days);
    a.forEach(async (element) => {
      element.setDate(element.getDate() + 1);
      await prismaClient.grade.create({
        data: {
          date: new Date(element.toDateString()),
          userId: studentId,
          courseId,
        },
      });
    });
    await prismaClient.course.update({
      where: {
        id: courseId,
      },
      data: {
        students: {
          create: [
            {
              student: {
                connect: {
                  id: studentId,
                },
              },
            },
          ],
        },
      },
    });
  }

  async updateGrade(id, grade) {
    await prismaClient.grade.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });
  }

  async getCourse(id) {
    const course = await prismaClient.course.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
        students: {
          include: {
            student: true,
          },
        },
      },
    });
    return course;
  }

  async addHomework(courseId, body, date) {
    await prismaClient.homeWork.create({
      data: {
        Course: {
          connect: {
            id: courseId,
          },
        },
        body,
        date,
      },
    });
  }

  async addMaterial(courseId, name, materialurl) {
    const material = await prismaClient.materials.create({
      data: {
        name: name,
        courseId,
        materialurl,
      },
    });
    return material;
  }

  async getCoursesWithMaterials(user) {
    const query =
      user.type == "student"
        ? {
            where: {
              students: {
                some: {
                  studentId: user.id,
                },
              },
              materials: {
                some: {},
              },
            },
            select: {
              id: true,
              name: true,
              materials: true,
            },
          }
        : {
            where: {
              userId: user.id,
              materials: {
                some: {},
              },
            },
            select: {
              id: true,
              name: true,
              materials: true,
            },
          };
    const courses = await prismaClient.course.findMany(query);
    return courses;
  }

  async leaveCourse(studentId, courseId) {
    await prismaClient.studentOnCourse.delete({
      where: {
        studentId_courseId: {
          courseId,
          studentId: studentId
        }
      }
    })
  }
}
module.exports = new CourseService();
