-- CreateTable
CREATE TABLE `template` (
    `template_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `template_template_id_key`(`template_id`),
    UNIQUE INDEX `template_name_key`(`name`),
    PRIMARY KEY (`template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
