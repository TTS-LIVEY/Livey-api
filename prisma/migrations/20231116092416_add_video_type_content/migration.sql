/*
  Warnings:

  - Added the required column `video_type` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content" ADD COLUMN     "video_type" TEXT NOT NULL;
