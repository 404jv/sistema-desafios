-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desafios" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem_url" TEXT NOT NULL,

    CONSTRAINT "desafios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_desafio" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "nota" DOUBLE PRECISION,
    "repo_url" TEXT,
    "usuario_id" TEXT NOT NULL,
    "desafio_id" TEXT NOT NULL,

    CONSTRAINT "usuario_desafio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "desafio_id" TEXT NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuario_desafio" ADD CONSTRAINT "usuario_desafio_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_desafio" ADD CONSTRAINT "usuario_desafio_desafio_id_fkey" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_desafio_id_fkey" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
