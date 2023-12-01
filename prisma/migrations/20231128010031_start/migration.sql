-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NULL,
    `photo_url` VARCHAR(191) NULL,
    `password_hash` VARCHAR(191) NULL,

    UNIQUE INDEX `user_user_id_key`(`user_id`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_provider` (
    `provider_id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_user_id` VARCHAR(191) NOT NULL,
    `provider_names_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `auth_provider_provider_id_key`(`provider_id`),
    UNIQUE INDEX `auth_provider_provider_user_id_key`(`provider_user_id`),
    UNIQUE INDEX `auth_provider_user_id_key`(`user_id`),
    PRIMARY KEY (`provider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_name` (
    `provider_names_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `provider_name_provider_names_id_key`(`provider_names_id`),
    UNIQUE INDEX `provider_name_name_key`(`name`),
    PRIMARY KEY (`provider_names_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_provider` ADD CONSTRAINT `auth_provider_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_provider` ADD CONSTRAINT `auth_provider_provider_names_id_fkey` FOREIGN KEY (`provider_names_id`) REFERENCES `provider_name`(`provider_names_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
