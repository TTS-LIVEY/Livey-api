/*
  Warnings:

  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `journal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `watched` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "journal" DROP CONSTRAINT "journal_userId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_programId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "watched" DROP CONSTRAINT "watched_contentId_fkey";

-- DropForeignKey
ALTER TABLE "watched" DROP CONSTRAINT "watched_userId_fkey";

-- DropTable
DROP TABLE "content";

-- DropTable
DROP TABLE "favorite";

-- DropTable
DROP TABLE "journal";

-- DropTable
DROP TABLE "program";

-- DropTable
DROP TABLE "schedule";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "watched";

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "registered_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body_weight" INTEGER,
    "body_height" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "journal_id" UUID NOT NULL,
    "journal_note" VARCHAR(255),
    "journal_rating" INTEGER,
    "journal_weight" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_add" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("journal_id")
);

-- CreateTable
CREATE TABLE "History" (
    "history_id" UUID NOT NULL,
    "is_complete" BOOLEAN NOT NULL,
    "is_favorite" BOOLEAN NOT NULL,
    "contentId" INTEGER NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "Program" (
    "program_title" TEXT NOT NULL,
    "schedule_title" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("program_title","schedule_title")
);

-- CreateTable
CREATE TABLE "Content" (
    "content_id" SERIAL NOT NULL,
    "thumbnail_url" VARCHAR(255) NOT NULL,
    "video_title" VARCHAR(255) NOT NULL,
    "video_url" VARCHAR(255) NOT NULL,
    "video_type" VARCHAR(255) NOT NULL,
    "body_part" VARCHAR(255) NOT NULL,
    "program_title" TEXT NOT NULL,
    "schedule_title" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("content_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("content_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_program_title_schedule_title_fkey" FOREIGN KEY ("program_title", "schedule_title") REFERENCES "Program"("program_title", "schedule_title") ON DELETE RESTRICT ON UPDATE CASCADE;
