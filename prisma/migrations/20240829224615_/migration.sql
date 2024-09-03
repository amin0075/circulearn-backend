/*
  Warnings:

  - Added the required column `sessionId` to the `quizResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quizResult" ADD COLUMN     "sessionId" TEXT NOT NULL;
