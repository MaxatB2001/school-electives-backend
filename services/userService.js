const prismaClient = require("../lib/prismaClient.js");
const prisma = require("../lib/prismaClient.js");
const { getDaysArray } = require("../utils/date.js");
const tokenService = require("./tokenService.js");

class UserService {
  async registration(userData) {
    const user = await this.createUser(userData);
    const token = tokenService.generateAccessToken(user);
    return token;
  }

  async login(userData) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: userData.email,
      },
      include: {
        courses: true,
        Course: true
      },
    });
    const token = tokenService.generateAccessToken(user);
    return { token };
  }

  async createUser(userData) {
    const { firstName, lastName, type, email, password } = userData;
    const user = await prisma.user.create({
      data: {
        lastName,
        firstName,
        type,
        email,
        password,
      },
    });
    return user;
  }

  async getUser(id) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        courses: {
          include: {
            course: {
              include: {
                Grade: true
              }
            }
          }
        },
      },
    });
    return user;
  }

  async checkAuth(userData) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: userData.email,
      },
      include: {
        courses: true,
        Course: true
      },
    });
    const token = tokenService.generateAccessToken(user);
    return token ;
  }

  async getUserSchedule(studentId, date) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: studentId
      }
    })
    const schedule = [];
    let d = new Date(date);
    let oneDay = 60 * 60 * 24 * 1000;
    if (d.getDay() == 0) {
      d.setDate(d.getDate() - 6);
    } else {
      d.setDate(d.getDate() - (d.getDay() - 1));
    }
    for (let i = 1; i < 7; i++) {
      const today = new Date(new Date(d.getTime() + oneDay * i).toDateString());
      const query = user.type === "student" ? {
        where: {
          startDate: {
            lte: today,
          },
          endDate: {
            gte: today,
          },
          students: {
            some: {
              studentId,
            },
          },
          days: {
            has: i,
          },
        },
        include: {
          homework: {
            where: {
              date: today,
            },
          },
          Grade: {
            where: {
              date: today,
              userId: studentId,
            }
          }
        },
      } : {
        where: {
          startDate: {
            lte: today,
          },
          endDate: {
            gte: today,
          },
          userId: studentId,
          days: {
            has: i,
          },
        },
        include: {
          homework: {
            where: {
              date: today,
            },
          },
        },
      }
      const day = await prismaClient.course.findMany(query);
      day.sort((a, b) => {
        return a.time.getTime() - b.time.getTime();
      });
      schedule.push({
        date: today,
        courses: day,
      });
    }
    return schedule;
  }

  async getCourseJournal(courseId, classNumber, classLetter) {
    console.log(classLetter);
    console.log(classNumber);
    if (classNumber) classNumber = Number(classNumber)
    const course = await prismaClient.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        students: {
          where: {
            student: {
              classLetter,
              class: classNumber
            }
          },
          select: {
            student: {
              include: {
                Grade: {
                  where: {
                    courseId: courseId,
                  },
                  orderBy: [
                    {
                      date: "asc",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    });
    const days = getDaysArray(course.startDate, course.endDate, course.days);
    course.days = days;
    return course;
  }

  async getStudentGrades(id) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        courses: {
          include: {
            course: {
              include: {
                Grade: {
                  where: {
                    userId: id,
                    grade: {
                      gt: 0
                    }
                  },
                  orderBy: [
                    {
                      date: "asc",
                    },
                  ],
                },
              },
            }
          }
        },
      },
    });
    return user;
  }
}

module.exports = new UserService();
