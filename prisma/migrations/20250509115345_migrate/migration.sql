/*
  Warnings:

  - You are about to alter the column `category` on the `advance_requests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `advance_requests` MODIFY `category` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `advance_requests` ADD CONSTRAINT `advance_requests_category_fkey` FOREIGN KEY (`category`) REFERENCES `PermissionMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
