/*
  Warnings:

  - You are about to drop the column `register_date` on the `user` table. All the data in the column will be lost.
  - Added the required column `body_part` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content" ADD COLUMN     "body_part" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "register_date",
ADD COLUMN     "registered_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
