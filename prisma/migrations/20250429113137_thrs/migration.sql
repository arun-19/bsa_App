/*
  Warnings:

  - Added the required column `thrs` to the `PermissionEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permissionentry` ADD COLUMN `thrs` VARCHAR(191) NOT NULL;
