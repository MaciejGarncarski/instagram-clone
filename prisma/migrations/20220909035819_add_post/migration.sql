/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "author" UUID NOT NULL,
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "likes" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");
