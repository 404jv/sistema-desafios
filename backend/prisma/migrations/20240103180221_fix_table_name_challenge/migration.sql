-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "desafio_id" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_desafio_id_fkey" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
