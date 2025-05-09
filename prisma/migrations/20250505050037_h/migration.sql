-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `User`(`Idcard`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_rejectBy_fkey` FOREIGN KEY (`rejectBy`) REFERENCES `User`(`Idcard`) ON DELETE SET NULL ON UPDATE CASCADE;
