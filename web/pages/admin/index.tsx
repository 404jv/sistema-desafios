import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const route = useRouter()

  function navigateToUpdateUser() {

  }

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
        <Link className="text-white text-lg underline" href='/home' >{'<- Voltar'}</Link>
      </div>

      <main className="flex flex-row w-full h-size justify-center items-center mt-16 mb-16 gap-2">
        <Link href='/admin/aluno' className="p-4 text-white bg-gray-600 text-lg rounded hover:bg-slate-600 hover:transition-all ">
          Alunos
        </Link>
        <Link href='/admin/desafio' className="p-4 text-white bg-gray-600 text-lg rounded hover:bg-slate-600 hover:transition-all">
          Desafios
        </Link>
      </main>
    </div>
  )
}
