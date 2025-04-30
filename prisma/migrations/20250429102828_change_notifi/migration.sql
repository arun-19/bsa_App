/*
  Warnings:

  - You are about to alter the column `hod` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `hod` to the `PermissionEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permissionentry` ADD COLUMN `hod` INTEGER NOT NULL,
    MODIFY `modifiedOn` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` MODIFY `hod` INTEGER NULL;

-- CreateTable
CREATE TABLE `_PermissionEntryToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionEntryToUser_AB_unique`(`A`, `B`),
    INDEX `_PermissionEntryToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PermissionEntry` ADD CONSTRAINT `PermissionEntry_hod_fkey` FOREIGN KEY (`hod`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionEntryToUser` ADD CONSTRAINT `_PermissionEntryToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `PermissionEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionEntryToUser` ADD CONSTRAINT `_PermissionEntryToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
