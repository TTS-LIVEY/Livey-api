/*
  Warnings:

  - You are about to drop the column `watchedId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_watchedId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "watchedId";

-- AlterTable
ALTER TABLE "watched" ADD COLUMN     "userId" UUID;

-- AddForeignKey
ALTER TABLE "watched" ADD CONSTRAINT "watched_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
