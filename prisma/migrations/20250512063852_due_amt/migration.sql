-- AlterTable
ALTER TABLE `advance_requests` MODIFY `preloan` INTEGER NULL DEFAULT 0,
    MODIFY `predue` VARCHAR(200) NULL DEFAULT '0';
