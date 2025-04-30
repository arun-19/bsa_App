-- CreateTable
CREATE TABLE `PermissionDocID` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PermissionEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(191) NOT NULL,
    `modifiedOn` DATETIME(3) NULL,
    `isCancelled` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,
    `compCode` VARCHAR(191) NOT NULL,
    `docDate` DATETIME(3) NOT NULL,
    `fTime` VARCHAR(191) NOT NULL,
    `tTime` VARCHAR(191) NOT NULL,
    `permissionId` INTEGER NOT NULL,
    `reason` VARCHAR(191) NULL,
    `approvalStatus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
