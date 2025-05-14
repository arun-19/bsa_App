-- AlterTable
ALTER TABLE `permissionentry` MODIFY `approvedBy` VARCHAR(191) NULL DEFAULT '',
    MODIFY `rejectBy` VARCHAR(191) NULL DEFAULT '';
