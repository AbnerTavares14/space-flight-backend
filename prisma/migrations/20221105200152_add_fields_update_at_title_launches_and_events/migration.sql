/*
  Warnings:

  - The `publishedAt` column on the `articles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "events" JSONB,
ADD COLUMN     "launches" JSONB,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "featured" DROP NOT NULL,
ALTER COLUMN "featured" SET DEFAULT false,
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "newsSite" DROP NOT NULL,
ALTER COLUMN "summary" DROP NOT NULL,
DROP COLUMN "publishedAt",
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
DROP SEQUENCE "articles_id_seq";
