/*
  Warnings:

  - You are about to drop the column `comp_code` on the `advance_requests` table. All the data in the column will be lost.
  - Added the required column `compCode` to the `advance_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hod` to the `advance_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `advance_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `advance_requests` DROP COLUMN `comp_code`,
    ADD COLUMN `compCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `group` VARCHAR(191) NOT NULL DEFAULT 'Advance',
    ADD COLUMN `hod` VARCHAR(191) NOT NULL,
    ADD COLUMN `isCancelled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `mobile` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `advance_requests` ADD CONSTRAINT `advance_requests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;
