-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_desafio_id_fkey";

-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_desafio_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario_desafio" DROP CONSTRAINT "usuario_desafio_desafio_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario_desafio" DROP CONSTRAINT "usuario_desafio_usuario_id_fkey";

-- AddForeignKey
ALTER TABLE "usuario_desafio" ADD CONSTRAINT "usuario_desafio_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_desafio" ADD CONSTRAINT "usuario_desafio_desafio_id_fkey" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_desafio_id_fkey" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_desafio_id_fkey" FOREIGN KEY ("desafio_id") REFERENCES "desafios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
