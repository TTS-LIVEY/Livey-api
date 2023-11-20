/*
  Warnings:

  - You are about to drop the column `thumnail_url` on the `content` table. All the data in the column will be lost.
  - Added the required column `thumbnail_url` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content" DROP COLUMN "thumnail_url",
ADD COLUMN     "thumbnail_url" VARCHAR(255) NOT NULL;
