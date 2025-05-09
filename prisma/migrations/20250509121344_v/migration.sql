/*
  Warnings:

  - You are about to drop the column `approved_by` on the `advance_requests` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `advance_requests` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `advance_requests` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `advance_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `advance_requests` DROP COLUMN `approved_by`,
    DROP COLUMN `created_at`,
    DROP COLUMN `created_by`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `approvedBy` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `rejectBy` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `updatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
