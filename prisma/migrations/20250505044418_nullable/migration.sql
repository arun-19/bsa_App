-- DropForeignKey
ALTER TABLE `permissionentry` DROP FOREIGN KEY `PermissionEntry_approvedBy_fkey`;

-- DropForeignKey
ALTER TABLE `permissionentry` DROP FOREIGN KEY `PermissionEntry_rejectBy_fkey`;

-- DropIndex
DROP INDEX `PermissionEntry_approvedBy_fkey` ON `permissionentry`;

-- DropIndex
DROP INDEX `PermissionEntry_rejectBy_fkey` ON `permissionentry`;

-- AlterTable
ALTER TABLE `permissionentry` MODIFY `approvedBy` VARCHAR(191) NULL DEFAULT '',
    MODIFY `rejectBy` VARCHAR(191) NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `User`(`Idcard`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_rejectBy_fkey` FOREIGN KEY (`rejectBy`) REFERENCES `User`(`Idcard`) ON DELETE SET NULL ON UPDATE CASCADE;
