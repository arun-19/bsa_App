-- AlterTable
ALTER TABLE `leaveentry` ADD COLUMN `category` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `LeaveEntry` ADD CONSTRAINT `LeaveEntry_category_fkey` FOREIGN KEY (`category`) REFERENCES `PermissionMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
