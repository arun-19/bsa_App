/*
  Warnings:

  - You are about to alter the column `due` on the `advance_requests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `advance_requests` MODIFY `due` INTEGER NOT NULL;
