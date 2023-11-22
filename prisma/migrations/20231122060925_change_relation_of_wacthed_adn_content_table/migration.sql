/*
  Warnings:

  - You are about to drop the column `watchedId` on the `content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_watchedId_fkey";

-- AlterTable
ALTER TABLE "content" DROP COLUMN "watchedId";

-- AlterTable
ALTER TABLE "watched" ADD COLUMN     "contentId" INTEGER;

-- AddForeignKey
ALTER TABLE "watched" ADD CONSTRAINT "watched_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
