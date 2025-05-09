/*
  Warnings:

  - You are about to drop the column `leaveType` on the `leaveentry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `leaveentry` DROP COLUMN `leaveType`,
    ADD COLUMN `ltype` VARCHAR(191) NULL;
