-- AlterTable
ALTER TABLE `permissionentry` ADD COLUMN `approvedBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `rejectBy` VARCHAR(191) NOT NULL DEFAULT '';
