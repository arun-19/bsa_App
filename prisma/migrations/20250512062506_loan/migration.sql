/*
  Warnings:

  - Made the column `preloan` on table `advance_requests` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `advance_requests` MODIFY `preloan` INTEGER NOT NULL;
