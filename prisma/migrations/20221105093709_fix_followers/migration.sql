/*
  Warnings:

  - You are about to drop the column `from_user_id` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `to_user_id` on the `followers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[from]` on the table `followers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `from` to the `followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `followers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "followers" DROP COLUMN "from_user_id",
DROP COLUMN "to_user_id",
ADD COLUMN     "from" UUID NOT NULL,
ADD COLUMN     "to" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "followers_from_key" ON "followers"("from");

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_from_fkey" FOREIGN KEY ("from") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_to_fkey" FOREIGN KEY ("to") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
