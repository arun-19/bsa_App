-- DropForeignKey
ALTER TABLE `permissionentry` DROP FOREIGN KEY `PermissionEntry_hod_fkey`;

-- DropIndex
DROP INDEX `PermissionEntry_hod_fkey` ON `permissionentry`;

-- AlterTable
ALTER TABLE `permissionentry` MODIFY `hod` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_hod_fkey` FOREIGN KEY (`hod`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;
