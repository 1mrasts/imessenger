/*
  Warnings:

  - You are about to drop the column `password` on the `ChatPassword` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `ChatPassword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ChatPassword` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ChatPassword_user_id_key";

-- AlterTable
ALTER TABLE "ChatPassword" DROP COLUMN "password",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "failed_attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "locked_until" TIMESTAMP(3),
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
