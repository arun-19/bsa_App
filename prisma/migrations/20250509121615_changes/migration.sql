/*
  Warnings:

  - Added the required column `modified_By` to the `advance_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `advance_requests` ADD COLUMN `modified_By` VARCHAR(191) NOT NULL,
    ALTER COLUMN `createdBy` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `advance_requests` ADD CONSTRAINT `advance_requests_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `advance_requests` ADD CONSTRAINT `advance_requests_modified_By_fkey` FOREIGN KEY (`modified_By`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;
