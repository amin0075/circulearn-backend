/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `feedback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "feedback_sessionId_key" ON "feedback"("sessionId");
