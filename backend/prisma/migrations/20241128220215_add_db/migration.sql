-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mood_rating" INTEGER NOT NULL DEFAULT 0,
    "anxiety_level" INTEGER NOT NULL DEFAULT 0,
    "slept_hours" INTEGER NOT NULL DEFAULT 0,
    "quality_of_sleep" INTEGER NOT NULL DEFAULT 0,
    "disturbances" INTEGER NOT NULL DEFAULT 0,
    "physical_activity_type" TEXT,
    "physical_activity_duration" INTEGER,
    "socialized_for" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
