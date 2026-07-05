-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('chat', 'group');

-- CreateTable
CREATE TABLE "Chat" (
    "chat_id" SERIAL NOT NULL,
    "chat_type" "ChatType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "GroupInfo" (
    "chat_id" INTEGER NOT NULL,
    "group_name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "GroupInfo_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "ChatMembers" (
    "chat_members_id" SERIAL NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ChatMembers_pkey" PRIMARY KEY ("chat_members_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "message_content" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "MessageRead" (
    "message_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "read_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageRead_pkey" PRIMARY KEY ("message_id","user_id")
);

-- AddForeignKey
ALTER TABLE "GroupInfo" ADD CONSTRAINT "GroupInfo_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupInfo" ADD CONSTRAINT "GroupInfo_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMembers" ADD CONSTRAINT "ChatMembers_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMembers" ADD CONSTRAINT "ChatMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageRead" ADD CONSTRAINT "MessageRead_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("message_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageRead" ADD CONSTRAINT "MessageRead_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
