/*
  Warnings:

  - Made the column `contentId` on table `watched` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `watched` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "watched" DROP CONSTRAINT "watched_contentId_fkey";

-- DropForeignKey
ALTER TABLE "watched" DROP CONSTRAINT "watched_userId_fkey";

-- AlterTable
ALTER TABLE "watched" ALTER COLUMN "contentId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "watched" ADD CONSTRAINT "watched_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watched" ADD CONSTRAINT "watched_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
