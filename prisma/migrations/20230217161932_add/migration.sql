-- AlterTable
ALTER TABLE "HomeWork" ADD COLUMN     "courseId" TEXT;

-- AddForeignKey
ALTER TABLE "HomeWork" ADD CONSTRAINT "HomeWork_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
