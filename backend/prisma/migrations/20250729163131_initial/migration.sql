-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER');

-- CreateEnum
CREATE TYPE "ProblemStatusType" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "RankingType" AS ENUM ('OVERALL', 'MONTHLY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "RankingScope" AS ENUM ('BATCH', 'COLLEGE');

-- CreateTable
CREATE TABLE "college" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "college_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "college_id" TEXT NOT NULL,
    "student_enrollment_id" TEXT,
    "teacher_enrollment_id" TEXT,
    "student_streak" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_batch" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,

    CONSTRAINT "teacher_batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_batch" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,

    CONSTRAINT "student_batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subtopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "subtopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "platform_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "subtopic_id" TEXT NOT NULL,
    "added_by" TEXT NOT NULL,

    CONSTRAINT "problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_assignment" (
    "id" TEXT NOT NULL,
    "problem_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "assigned_by" TEXT NOT NULL,
    "assigned_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problem_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_status" (
    "id" TEXT NOT NULL,
    "problem_assignment_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "status" "ProblemStatusType" NOT NULL DEFAULT 'PENDING',
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problem_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranking" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "batch_id" TEXT,
    "college_id" TEXT,
    "ranking_type" "RankingType" NOT NULL,
    "ranking_scope" "RankingScope" NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "problems_solved" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "week_start_date" TIMESTAMP(3),
    "month_start_date" TIMESTAMP(3),

    CONSTRAINT "ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_student_enrollment_id_key" ON "user"("student_enrollment_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_teacher_enrollment_id_key" ON "user"("teacher_enrollment_id");

-- CreateIndex
CREATE INDEX "user_college_id_idx" ON "user"("college_id");

-- CreateIndex
CREATE INDEX "user_role_idx" ON "user"("role");

-- CreateIndex
CREATE INDEX "user_student_streak_idx" ON "user"("student_streak");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_batch_teacher_id_batch_id_key" ON "teacher_batch"("teacher_id", "batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_batch_student_id_batch_id_key" ON "student_batch"("student_id", "batch_id");

-- CreateIndex
CREATE INDEX "problem_platform_id_idx" ON "problem"("platform_id");

-- CreateIndex
CREATE INDEX "problem_topic_id_idx" ON "problem"("topic_id");

-- CreateIndex
CREATE INDEX "problem_subtopic_id_idx" ON "problem"("subtopic_id");

-- CreateIndex
CREATE INDEX "problem_difficulty_idx" ON "problem"("difficulty");

-- CreateIndex
CREATE INDEX "problem_status_student_id_idx" ON "problem_status"("student_id");

-- CreateIndex
CREATE INDEX "problem_status_status_idx" ON "problem_status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "problem_status_problem_assignment_id_student_id_key" ON "problem_status"("problem_assignment_id", "student_id");

-- CreateIndex
CREATE INDEX "ranking_ranking_type_idx" ON "ranking"("ranking_type");

-- CreateIndex
CREATE INDEX "ranking_ranking_scope_idx" ON "ranking"("ranking_scope");

-- CreateIndex
CREATE INDEX "ranking_rank_idx" ON "ranking"("rank");

-- CreateIndex
CREATE INDEX "ranking_score_idx" ON "ranking"("score");

-- CreateIndex
CREATE INDEX "ranking_batch_id_idx" ON "ranking"("batch_id");

-- CreateIndex
CREATE INDEX "ranking_college_id_idx" ON "ranking"("college_id");

-- CreateIndex
CREATE INDEX "ranking_week_start_date_idx" ON "ranking"("week_start_date");

-- CreateIndex
CREATE INDEX "ranking_month_start_date_idx" ON "ranking"("month_start_date");

-- CreateIndex
CREATE UNIQUE INDEX "ranking_student_id_ranking_type_ranking_scope_batch_id_coll_key" ON "ranking"("student_id", "ranking_type", "ranking_scope", "batch_id", "college_id");

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "college"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "college"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_batch" ADD CONSTRAINT "teacher_batch_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_batch" ADD CONSTRAINT "teacher_batch_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_batch" ADD CONSTRAINT "student_batch_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_batch" ADD CONSTRAINT "student_batch_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtopic" ADD CONSTRAINT "subtopic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_subtopic_id_fkey" FOREIGN KEY ("subtopic_id") REFERENCES "subtopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_assignment" ADD CONSTRAINT "problem_assignment_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_assignment" ADD CONSTRAINT "problem_assignment_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_assignment" ADD CONSTRAINT "problem_assignment_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_status" ADD CONSTRAINT "problem_status_problem_assignment_id_fkey" FOREIGN KEY ("problem_assignment_id") REFERENCES "problem_assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_status" ADD CONSTRAINT "problem_status_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranking" ADD CONSTRAINT "ranking_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranking" ADD CONSTRAINT "ranking_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranking" ADD CONSTRAINT "ranking_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "college"("id") ON DELETE SET NULL ON UPDATE CASCADE;
