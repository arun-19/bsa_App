/*
  Warnings:

  - Made the column `Idcard` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `hod` VARCHAR(191) NULL,
    MODIFY `Idcard` VARCHAR(191) NOT NULL;
