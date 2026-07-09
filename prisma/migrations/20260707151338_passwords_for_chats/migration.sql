-- CreateTable
CREATE TABLE "ChatPassword" (
    "chat_password_id" SERIAL NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "ChatPassword_pkey" PRIMARY KEY ("chat_password_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatPassword_chat_id_key" ON "ChatPassword"("chat_id");

-- AddForeignKey
ALTER TABLE "ChatPassword" ADD CONSTRAINT "ChatPassword_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
