/*
  Warnings:

  - The `keywords` column on the `Talk` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Talk" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL,
DROP COLUMN "keywords",
ADD COLUMN     "keywords" TEXT[],
ALTER COLUMN "shareable" DROP NOT NULL,
ALTER COLUMN "published" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;
