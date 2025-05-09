-- AlterTable
ALTER TABLE `leaveentry` ADD COLUMN `group` VARCHAR(191) NOT NULL DEFAULT 'Leave';

-- AlterTable
ALTER TABLE `permissionentry` MODIFY `group` VARCHAR(191) NOT NULL DEFAULT 'Permission';
