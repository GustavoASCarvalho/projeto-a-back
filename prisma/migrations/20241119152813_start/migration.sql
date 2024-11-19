-- CreateEnum
CREATE TYPE "feedback_type" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "variable_type" AS ENUM ('STRING', 'TEXT');

-- CreateEnum
CREATE TYPE "visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'NOT_LISTED');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT,
    "photo_url" TEXT,
    "password_hash" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "auth_provider" (
    "provider_id" SERIAL NOT NULL,
    "provider_user_id" TEXT NOT NULL,
    "provider_names_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "auth_provider_pkey" PRIMARY KEY ("provider_id")
);

-- CreateTable
CREATE TABLE "provider_name" (
    "provider_names_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provider_name_pkey" PRIMARY KEY ("provider_names_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "template_history" (
    "template_history_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "visibility" "visibility" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "template_history_pkey" PRIMARY KEY ("template_history_id")
);

-- CreateTable
CREATE TABLE "template" (
    "template_id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "logo_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "visibility" "visibility" NOT NULL DEFAULT 'PRIVATE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_pkey" PRIMARY KEY ("template_id")
);

-- CreateTable
CREATE TABLE "variable" (
    "variable_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "template_id" INTEGER,
    "type" "variable_type" NOT NULL DEFAULT 'STRING',
    "template_history_id" INTEGER,

    CONSTRAINT "variable_pkey" PRIMARY KEY ("variable_id")
);

-- CreateTable
CREATE TABLE "categories_on_template" (
    "category_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "categories_on_template_pkey" PRIMARY KEY ("template_id","category_id")
);

-- CreateTable
CREATE TABLE "categories_on_template_history" (
    "template_history_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "categories_on_template_history_pkey" PRIMARY KEY ("template_history_id","category_id")
);

-- CreateTable
CREATE TABLE "conversation" (
    "conversation_id" SERIAL NOT NULL,
    "template_history_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "message" (
    "message_id" SERIAL NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "chatgpt_api_key_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "response" TEXT,
    "message_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response_timestamp" TIMESTAMP(3),

    CONSTRAINT "message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "variable_value" (
    "variable_value_id" SERIAL NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "variable_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "variable_value_pkey" PRIMARY KEY ("variable_value_id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedback_id" SERIAL NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "type" "feedback_type" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "rating" (
    "rating_id" SERIAL NOT NULL,
    "template_history_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "chatgpt_api_key" (
    "chatgpt_api_key_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "api_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chatgpt_api_key_pkey" PRIMARY KEY ("chatgpt_api_key_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_provider_provider_id_key" ON "auth_provider"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_provider_provider_user_id_key" ON "auth_provider"("provider_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_provider_user_id_key" ON "auth_provider"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "provider_name_provider_names_id_key" ON "provider_name"("provider_names_id");

-- CreateIndex
CREATE UNIQUE INDEX "provider_name_name_key" ON "provider_name"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_category_id_key" ON "category"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "template_history_template_history_id_key" ON "template_history"("template_history_id");

-- CreateIndex
CREATE UNIQUE INDEX "template_template_id_key" ON "template"("template_id");

-- CreateIndex
CREATE UNIQUE INDEX "template_slug_key" ON "template"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "variable_variable_id_key" ON "variable"("variable_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_conversation_id_key" ON "conversation"("conversation_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_message_id_key" ON "message"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "variable_value_variable_value_id_key" ON "variable_value"("variable_value_id");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_feedback_id_key" ON "feedback"("feedback_id");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_conversation_id_key" ON "feedback"("conversation_id");

-- CreateIndex
CREATE UNIQUE INDEX "rating_rating_id_key" ON "rating"("rating_id");

-- CreateIndex
CREATE UNIQUE INDEX "chatgpt_api_key_chatgpt_api_key_id_key" ON "chatgpt_api_key"("chatgpt_api_key_id");

-- CreateIndex
CREATE UNIQUE INDEX "chatgpt_api_key_api_key_key" ON "chatgpt_api_key"("api_key");

-- AddForeignKey
ALTER TABLE "auth_provider" ADD CONSTRAINT "auth_provider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_provider" ADD CONSTRAINT "auth_provider_provider_names_id_fkey" FOREIGN KEY ("provider_names_id") REFERENCES "provider_name"("provider_names_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_history" ADD CONSTRAINT "template_history_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template"("template_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable" ADD CONSTRAINT "variable_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template"("template_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable" ADD CONSTRAINT "variable_template_history_id_fkey" FOREIGN KEY ("template_history_id") REFERENCES "template_history"("template_history_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_template" ADD CONSTRAINT "categories_on_template_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_template" ADD CONSTRAINT "categories_on_template_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template"("template_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_template_history" ADD CONSTRAINT "categories_on_template_history_template_history_id_fkey" FOREIGN KEY ("template_history_id") REFERENCES "template_history"("template_history_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_template_history" ADD CONSTRAINT "categories_on_template_history_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_template_history_id_fkey" FOREIGN KEY ("template_history_id") REFERENCES "template_history"("template_history_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatgpt_api_key_id_fkey" FOREIGN KEY ("chatgpt_api_key_id") REFERENCES "chatgpt_api_key"("chatgpt_api_key_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable_value" ADD CONSTRAINT "variable_value_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable_value" ADD CONSTRAINT "variable_value_variable_id_fkey" FOREIGN KEY ("variable_id") REFERENCES "variable"("variable_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template"("template_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatgpt_api_key" ADD CONSTRAINT "chatgpt_api_key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
