-- DropForeignKey
ALTER TABLE "posts_likes" DROP CONSTRAINT "posts_likes_id_fkey";

-- AlterTable
CREATE SEQUENCE "posts_comments_id_seq";
ALTER TABLE "posts_comments" ALTER COLUMN "id" SET DEFAULT nextval('posts_comments_id_seq');
ALTER SEQUENCE "posts_comments_id_seq" OWNED BY "posts_comments"."id";

-- AlterTable
CREATE SEQUENCE "posts_likes_id_seq";
ALTER TABLE "posts_likes" ADD COLUMN     "post_id" SERIAL NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('posts_likes_id_seq');
ALTER SEQUENCE "posts_likes_id_seq" OWNED BY "posts_likes"."id";

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
