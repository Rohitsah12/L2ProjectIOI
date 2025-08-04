/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `college` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "college_email_key" ON "college"("email");
