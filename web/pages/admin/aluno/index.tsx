import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
  totalChallenges: number;
}

export default function CreateChallenge() {
  const [users, setUsers] = useState<User[]>()

  async function handleResetPassword(userId: string) {
    const token = sessionStorage.getItem('token@sistemadesafios');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/reset-password/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 204) {
        alert('Senha alterada com sucesso!')
        return;
      }
      const errorResponse = await response.json();
      alert(errorResponse.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getUserList(): Promise<void> {
      const token = sessionStorage.getItem('token@sistemadesafios');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const body = await response.json();
        setUsers(body)
      } catch (error) {
        console.error(error);
      }
    }
    getUserList();
  }, [])

  return (
    <div className="">
      <Header />
      <div className="mt-8 ml-16">
        <Link className="text-white text-lg underline" href='/admin' >{'<- Voltar'}</Link>
      </div>

      <main className="flex flex-col w-full h-size justify-center items-center mt-16 mb-16">
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
              {
                users?.map((user) => {
                  return (
                    <tr key={user?.id} className="min-h-10 bg-black-800 mb-4">
                      <td className="py-2 px-4">{user?.username}</td>
                      <td className="py-2 px-4">{user?.name}</td>
                      <td className={`py-2 px-4 ${user?.isAdmin ? 'text-green' : 'text-red-500' }`}>
                        { user?.isAdmin ? 'Sim' : 'Não' }
                      </td>
                      <td className="py-2 px-4">{user?.totalChallenges}</td>
                      <td className="py-2 px-4">DD/MM/AAAA</td>
                      <td className="flex flex-col text-sm py-2 px-4 underline">
                        <Link 
                          href={`/admin/aluno/update?userData=${encodeURIComponent(JSON.stringify(user))}`}
                        >
                          Editar
                        </Link>
                        <button onClick={() => handleResetPassword(user?.id)}>Resetar senha</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
