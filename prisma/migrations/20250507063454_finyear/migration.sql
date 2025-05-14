/*
  Warnings:

  - Added the required column `finyear` to the `LeaveEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leaveentry` ADD COLUMN `finyear` VARCHAR(191) NOT NULL;
