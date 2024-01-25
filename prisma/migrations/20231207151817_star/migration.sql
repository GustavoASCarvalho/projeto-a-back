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

-- CreateTable
CREATE TABLE `category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_category_id_key`(`category_id`),
    UNIQUE INDEX `category_name_key`(`name`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `template_history` (
    `template_history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `prompt` TEXT NOT NULL,
    `logo_url` TEXT NOT NULL,
    `visibility` ENUM('PUBLIC', 'PRIVATE', 'NOT_LISTED') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `template_id` INTEGER NOT NULL,

    UNIQUE INDEX `template_history_template_history_id_key`(`template_history_id`),
    PRIMARY KEY (`template_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `template` (
    `template_id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `logo_url` TEXT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `prompt` TEXT NOT NULL,
    `visibility` ENUM('PUBLIC', 'PRIVATE', 'NOT_LISTED') NOT NULL DEFAULT 'PRIVATE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `template_template_id_key`(`template_id`),
    UNIQUE INDEX `template_slug_key`(`slug`),
    PRIMARY KEY (`template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variable` (
    `variable_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `value` TEXT NOT NULL,
    `placeholder` TEXT NOT NULL,
    `tip` TEXT NOT NULL,
    `template_id` INTEGER NULL,
    `type` ENUM('STRING', 'TEXT') NOT NULL DEFAULT 'STRING',
    `template_history_id` INTEGER NULL,

    UNIQUE INDEX `variable_variable_id_key`(`variable_id`),
    PRIMARY KEY (`variable_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_on_template` (
    `category_id` INTEGER NOT NULL,
    `template_id` INTEGER NOT NULL,

    PRIMARY KEY (`template_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_on_template_history` (
    `template_history_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`template_history_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversation` (
    `conversation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_history_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `conversation_conversation_id_key`(`conversation_id`),
    PRIMARY KEY (`conversation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversation_id` INTEGER NOT NULL,
    `chatgpt_api_key_id` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `response` VARCHAR(191) NULL,
    `message_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `response_timestamp` DATETIME(3) NULL,

    UNIQUE INDEX `message_message_id_key`(`message_id`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variable_value` (
    `variable_value_id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversation_id` INTEGER NOT NULL,
    `variable_id` INTEGER NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `variable_value_variable_value_id_key`(`variable_value_id`),
    PRIMARY KEY (`variable_value_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `feedback_id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversation_id` INTEGER NOT NULL,
    `type` ENUM('POSITIVE', 'NEGATIVE') NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `feedback_feedback_id_key`(`feedback_id`),
    UNIQUE INDEX `feedback_conversation_id_key`(`conversation_id`),
    PRIMARY KEY (`feedback_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `rating_id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_history_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `template_id` INTEGER NOT NULL,

    UNIQUE INDEX `rating_rating_id_key`(`rating_id`),
    PRIMARY KEY (`rating_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatgpt_api_key` (
    `chatgpt_api_key_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `api_key` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `chatgpt_api_key_chatgpt_api_key_id_key`(`chatgpt_api_key_id`),
    UNIQUE INDEX `chatgpt_api_key_api_key_key`(`api_key`),
    PRIMARY KEY (`chatgpt_api_key_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_provider` ADD CONSTRAINT `auth_provider_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_provider` ADD CONSTRAINT `auth_provider_provider_names_id_fkey` FOREIGN KEY (`provider_names_id`) REFERENCES `provider_name`(`provider_names_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `template_history` ADD CONSTRAINT `template_history_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `template`(`template_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `template` ADD CONSTRAINT `template_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variable` ADD CONSTRAINT `variable_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `template`(`template_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variable` ADD CONSTRAINT `variable_template_history_id_fkey` FOREIGN KEY (`template_history_id`) REFERENCES `template_history`(`template_history_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_template` ADD CONSTRAINT `categories_on_template_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_template` ADD CONSTRAINT `categories_on_template_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `template`(`template_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_template_history` ADD CONSTRAINT `categories_on_template_history_template_history_id_fkey` FOREIGN KEY (`template_history_id`) REFERENCES `template_history`(`template_history_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_template_history` ADD CONSTRAINT `categories_on_template_history_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_template_history_id_fkey` FOREIGN KEY (`template_history_id`) REFERENCES `template_history`(`template_history_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`conversation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_chatgpt_api_key_id_fkey` FOREIGN KEY (`chatgpt_api_key_id`) REFERENCES `chatgpt_api_key`(`chatgpt_api_key_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variable_value` ADD CONSTRAINT `variable_value_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`conversation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variable_value` ADD CONSTRAINT `variable_value_variable_id_fkey` FOREIGN KEY (`variable_id`) REFERENCES `variable`(`variable_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`conversation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `template`(`template_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatgpt_api_key` ADD CONSTRAINT `chatgpt_api_key_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
