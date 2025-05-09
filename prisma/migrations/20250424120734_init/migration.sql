-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL;

-- RenameIndex
ALTER TABLE `companycode` RENAME INDEX `CompanyCode_Idcard_fkey` TO `CompanyCode_Idcard_idx`;
