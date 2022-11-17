/*
  Warnings:

  - You are about to drop the column `avatar_file_id` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "avatar_file_id",
ADD COLUMN     "file_id" TEXT;
