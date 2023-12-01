/*
  Warnings:

  - You are about to drop the `template` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `template`;

-- CreateTable
CREATE TABLE `template_category` (
    `template_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `template_category_template_category_id_key`(`template_category_id`),
    UNIQUE INDEX `template_category_name_key`(`name`),
    PRIMARY KEY (`template_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
