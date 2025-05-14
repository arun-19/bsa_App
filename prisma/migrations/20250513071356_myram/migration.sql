/*
  Warnings:

  - You are about to alter the column `fincode` on the `advance_requests` table. The data in that column could be lost. The data in that column will be cast from `Int` to `MediumInt`.
  - You are about to alter the column `paycode` on the `advance_requests` table. The data in that column could be lost. The data in that column will be cast from `Int` to `MediumInt`.

*/
-- AlterTable
ALTER TABLE `advance_requests` MODIFY `fincode` MEDIUMINT NOT NULL,
    MODIFY `paycode` MEDIUMINT NOT NULL;
