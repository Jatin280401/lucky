-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SattaGame" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "yesterday" TEXT,
    "today" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SattaGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyResult" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "gameSlug" TEXT NOT NULL,
    "result" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveResult" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "result" TEXT,
    "time" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiveResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentSection" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteConfig_key_key" ON "SiteConfig"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SattaGame_slug_key" ON "SattaGame"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DailyResult_date_gameSlug_key" ON "DailyResult"("date", "gameSlug");

-- CreateIndex
CREATE UNIQUE INDEX "ContentSection_key_key" ON "ContentSection"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_clerkId_key" ON "AdminUser"("clerkId");
