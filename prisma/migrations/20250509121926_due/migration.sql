/*
  Warnings:

  - Added the required column `due` to the `advance_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `advance_requests` ADD COLUMN `due` VARCHAR(191) NOT NULL;
