/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `ChatPassword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `ChatPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatPassword" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatPassword_user_id_key" ON "ChatPassword"("user_id");

-- AddForeignKey
ALTER TABLE "ChatPassword" ADD CONSTRAINT "ChatPassword_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
