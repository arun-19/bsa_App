-- AlterTable
ALTER TABLE `permissionentry` ADD COLUMN `modified_By` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_modified_By_fkey` FOREIGN KEY (`modified_By`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_rejectBy_fkey` FOREIGN KEY (`rejectBy`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;
