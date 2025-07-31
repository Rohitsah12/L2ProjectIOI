-- CreateTable
CREATE TABLE "student_platform_account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "platform_id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,

    CONSTRAINT "student_platform_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "student_platform_account_handle_idx" ON "student_platform_account"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "student_platform_account_user_id_platform_id_key" ON "student_platform_account"("user_id", "platform_id");

-- AddForeignKey
ALTER TABLE "student_platform_account" ADD CONSTRAINT "student_platform_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_platform_account" ADD CONSTRAINT "student_platform_account_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
