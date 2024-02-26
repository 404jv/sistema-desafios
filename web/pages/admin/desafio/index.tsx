import Card, { Challenge } from "@/components/Card";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateChallenge() {
  const [challenges, setChallenges] = useState<Challenge[]>()
  const router = useRouter()

  useEffect(() => {
    async function loadChallenges() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/challenges/list`);
        const body = await response.json();
        setChallenges(body);
      } catch (error) {
        console.error(error);
      }
    }
    loadChallenges()
  }, [router])

  return (
    <div className="">
      <Header />
      <div className="mt-8 ml-16">
        <Link className="text-white text-lg underline" href='/admin' >{'<- Voltar'}</Link>
      </div>

      <main className="flex flex-col w-full h-size justify-center items-center mt-16 mb-16">
        <Link href='/admin/desafio/criar-desafio' className="p-4 text-white bg-gray-600 text-lg mb-4 rounded hover:bg-slate-600 hover:transition-all">
          Criar Desafio
        </Link>

        <h1 className="text-white font-bold text-2xl mb-4">Edição de Desafios</h1>
        
        <div className="flex pl-8 gap-2 flex-wrap justify-center mr-1">
          {challenges?.map(challenge => (
            <Card 
              key={challenge.id} 
              challenge={challenge}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
