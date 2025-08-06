/*
  Warnings:

  - Added the required column `created_by` to the `subtopic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subtopic" ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "topic" ADD COLUMN     "created_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtopic" ADD CONSTRAINT "subtopic_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
