/*
  Warnings:

  - You are about to drop the `_companycodetouser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Idcard]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_companycodetouser` DROP FOREIGN KEY `_CompanyCodeToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_companycodetouser` DROP FOREIGN KEY `_CompanyCodeToUser_B_fkey`;

-- DropTable
DROP TABLE `_companycodetouser`;

-- CreateIndex
CREATE UNIQUE INDEX `User_Idcard_key` ON `User`(`Idcard`);

-- AddForeignKey
ALTER TABLE `CompanyCode` ADD CONSTRAINT `CompanyCode_Idcard_fkey` FOREIGN KEY (`Idcard`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;
