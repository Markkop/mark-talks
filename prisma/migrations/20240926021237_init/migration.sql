-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "profile_image_url" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "document_id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_profile_img" TEXT NOT NULL,
    "author_instagram" TEXT NOT NULL,
    "author_twitter" TEXT NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "blog_html" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "image_alt" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "keywords" TEXT[],

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "documents_document_id_key" ON "documents"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "author_author_id_key" ON "author"("author_id");
