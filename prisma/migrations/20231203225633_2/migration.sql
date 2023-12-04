-- DropForeignKey
ALTER TABLE `variable` DROP FOREIGN KEY `variable_template_id_fkey`;

-- AlterTable
ALTER TABLE `variable` MODIFY `template_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `variable` ADD CONSTRAINT `variable_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `template`(`template_id`) ON DELETE SET NULL ON UPDATE CASCADE;
