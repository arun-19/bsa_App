-- AlterTable
ALTER TABLE `permissionmaster` ADD COLUMN `COMPCODE` VARCHAR(191) NOT NULL DEFAULT 'null';

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_category_fkey` FOREIGN KEY (`category`) REFERENCES `PermissionMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
