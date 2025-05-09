-- DropForeignKey
ALTER TABLE `permissionentry` DROP FOREIGN KEY `PermissionEntry_approvedBy_fkey`;

-- DropForeignKey
ALTER TABLE `permissionentry` DROP FOREIGN KEY `PermissionEntry_rejectBy_fkey`;

-- DropIndex
DROP INDEX `PermissionEntry_approvedBy_fkey` ON `permissionentry`;

-- DropIndex
DROP INDEX `PermissionEntry_rejectBy_fkey` ON `permissionentry`;
