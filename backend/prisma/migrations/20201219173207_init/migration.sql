-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL', 'API', 'FORGOT');

-- CreateEnum
CREATE TYPE "TodoState" AS ENUM ('CREATION', 'STANDBY', 'RUNNING', 'DONE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMELE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'USER', 'ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastName" TEXT,
    "firstName" TEXT,
    "Role" "Role" NOT NULL DEFAULT E'USER',
    "nickName" TEXT,
    "Gender" "Gender",
    "pwdHash" TEXT,
    "salt" TEXT,
    "social" JSONB,
    "language" TEXT DEFAULT E'en',
    "isValidated" TIMESTAMP(3),
    "isSuspended" TIMESTAMP(3),
    "isDeleted" TIMESTAMP(3),
    "isAdmin" BOOLEAN DEFAULT false,
    "manager" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "TokenType" NOT NULL,
    "emailToken" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiration" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderProfile" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "isDeleted" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderGroup" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderTodo" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "state" "TodoState" NOT NULL DEFAULT E'CREATION',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "mainTodo" TEXT,
    "isDeleted" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTodoLink" (
    "userId" TEXT NOT NULL,
    "todoId" TEXT NOT NULL,
    "isAuthor" BOOLEAN NOT NULL DEFAULT true,
    "isAssigned" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("userId","todoId")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storageName" TEXT NOT NULL,
    "type" TEXT,
    "data" TEXT,
    "owner" TEXT,
    "size" INTEGER,
    "isDeleted" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangesTracking" (
"id" SERIAL,
    "doneAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "newData" JSONB NOT NULL,
    "oldData" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderPost" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "authorId" TEXT NOT NULL,
    "isDeleted" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "orderCategory" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" TIMESTAMP(3),
    "orderComment" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigParam" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "utility" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emaildomain" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "domain" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TodoToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToTodo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token.emailToken_unique" ON "Token"("emailToken");

-- CreateIndex
CREATE UNIQUE INDEX "File.storageName_unique" ON "File"("storageName");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigParam.name_unique" ON "ConfigParam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Emaildomain.domain_unique" ON "Emaildomain"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToUser_AB_unique" ON "_ProfileToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToUser_B_index" ON "_ProfileToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TodoToUser_AB_unique" ON "_TodoToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TodoToUser_B_index" ON "_TodoToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToTodo_AB_unique" ON "_GroupToTodo"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToTodo_B_index" ON "_GroupToTodo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "_CategoryToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPost_B_index" ON "_CategoryToPost"("B");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("manager")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY("mainTodo")REFERENCES "Todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTodoLink" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTodoLink" ADD FOREIGN KEY("todoId")REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangesTracking" ADD FOREIGN KEY("authorId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY("authorId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY("postId")REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY("authorId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToUser" ADD FOREIGN KEY("A")REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToUser" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD FOREIGN KEY("A")REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TodoToUser" ADD FOREIGN KEY("A")REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TodoToUser" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTodo" ADD FOREIGN KEY("A")REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTodo" ADD FOREIGN KEY("B")REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPost" ADD FOREIGN KEY("A")REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPost" ADD FOREIGN KEY("B")REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
