/*
  Warnings:

  - The required column `img_uuid` was added to the `posts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "img_uuid" UUID NOT NULL;
