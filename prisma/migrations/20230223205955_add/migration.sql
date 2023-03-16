-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "class" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "grade" INTEGER DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
