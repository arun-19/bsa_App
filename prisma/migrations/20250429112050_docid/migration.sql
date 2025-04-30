/*
  Warnings:

  - A unique constraint covering the columns `[docid]` on the table `PermissionEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `docid` to the `PermissionEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permissionentry` ADD COLUMN `docid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PermissionEntry_docid_key` ON `PermissionEntry`(`docid`);
