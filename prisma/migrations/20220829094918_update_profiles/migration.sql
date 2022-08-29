-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "profile_id" SMALLSERIAL NOT NULL,
    "username" TEXT,
    "avatar_url" TEXT,
    "website" TEXT,
    "bio" VARCHAR,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_profile_id_key" ON "profiles"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");
