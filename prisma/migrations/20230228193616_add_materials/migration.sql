-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "about" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "class" DROP NOT NULL,
ALTER COLUMN "class" DROP DEFAULT,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Materials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "materialurl" TEXT NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "Materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Materials" ADD CONSTRAINT "Materials_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
