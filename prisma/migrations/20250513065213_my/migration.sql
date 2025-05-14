/*
  Warnings:

  - Made the column `fincode` on table `advance_requests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paycode` on table `advance_requests` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `advance_requests` MODIFY `fincode` INTEGER NOT NULL,
    MODIFY `paycode` INTEGER NOT NULL;
