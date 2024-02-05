import Header from "@/components/Header";
import Link from "next/link";

export default function CreateChallenge() {
  return (
    <div className="">
      <Header />
      <div className="mt-8 ml-16">
        <Link className="text-white text-lg underline" href='/home' >{'<- Voltar'}</Link>
      </div>

      <main className="flex flex-col w-full h-size justify-center items-center mt-16">
        <h1 className="text-white font-bold text-xl">Alunos</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-center">
            <thead className="text-purple-900">
              <tr>
                <th className="py-2 px-4">Usuário</th>
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">ADM</th>
                <th className="py-2 px-4">Total de Desafios</th>
                <th className="py-2 px-4">Conta Criada</th>
              </tr>
            </thead>

            <tbody className="text-gray-500">
              <tr className="min-h-10 bg-black-800 mb-4">
                <td className="py-2 px-4">404jv</td>
                <td className="py-2 px-4">João Victor Ramalho Alves</td>
                <td className="py-2 px-4 text-red-600">Não</td>
                <td className="py-2 px-4">0</td>
                <td className="py-2 px-4">08/01/2004</td>
                <td className="flex flex-col text-sm py-2 px-4 underline">
                  <Link href={'/'}>Editar</Link>
                  <Link href={'/'}>Resetar senha</Link>
                </td>
              </tr>

              <tr className="min-h-10 bg-black-800 mb-4">
                <td className="py-2 px-4">404jv</td>
                <td className="py-2 px-4">João Victor Ramalho Alves</td>
                <td className="py-2 px-4 text-red-600">Não</td>
                <td className="py-2 px-4">0</td>
                <td className="py-2 px-4">08/01/2004</td>
                <td className="flex flex-col text-sm py-2 px-4 underline">
                  <Link href={'/'}>Editar</Link>
                  <Link href={'/'}>Resetar senha</Link>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
