-- CreateTable
CREATE TABLE `LeaveEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(191) NOT NULL,
    `modified_By` VARCHAR(191) NOT NULL,
    `modifiedOn` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isCancelled` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `compCode` VARCHAR(191) NOT NULL,
    `docid` VARCHAR(191) NOT NULL,
    `docDate` DATETIME(3) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `totalDays` DOUBLE NOT NULL,
    `leaveType` VARCHAR(191) NULL,
    `mobile` VARCHAR(191) NULL,
    `reason` VARCHAR(191) NULL,
    `approvalStatus` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `approvedBy` VARCHAR(191) NULL DEFAULT '',
    `rejectBy` VARCHAR(191) NULL DEFAULT '',
    `hod` VARCHAR(191) NOT NULL,
    `leaveId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LeaveEntry_docid_key`(`docid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaveEntry` ADD CONSTRAINT `LeaveEntry_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveEntry` ADD CONSTRAINT `LeaveEntry_modified_By_fkey` FOREIGN KEY (`modified_By`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveEntry` ADD CONSTRAINT `LeaveEntry_hod_fkey` FOREIGN KEY (`hod`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveEntry` ADD CONSTRAINT `LeaveEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Idcard`) ON DELETE RESTRICT ON UPDATE CASCADE;
