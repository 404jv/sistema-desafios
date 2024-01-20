import Card, { Challenge } from "@/components/Card";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import loadChallenges from "./api/load-challenges";

type Props = {
  challenges: Challenge[]
}

export default function Home({ challenges }: Props) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userJson = localStorage.getItem('user@sistemadesafios') as string
    setUser(JSON.parse(userJson))
    const token = localStorage.getItem('token@sistemadesafios');
    if (!token) {
      router.push('/login');
    }    
  }, [router])

  return (
    <div>
      <Header />

      <main>
        <h1 className="font-bold text-2xl text-white mt-16 mb-8 ml-8">👋 Olá, {user?.name}</h1>
        <div className='flex flex-row items-center h-size justify-between pl-8 pr-8 mb-4'>
          <h2 className='text-purple-900 font-bold text-3xl'>Desafios</h2>
          <div className='flex gap-16'>
            <div className="flex  justify-center align-center flex-col">
              <p className='text-white text-xl'>Módulo</p>
              <select
                className='border-0 bg-transparent text-white text-center'
                name="filter-modulos"
              >
                <option className="text-black" value="Todos">Todos</option>
                <option className="text-black" value="Kodu">Kodu</option>
                <option className="text-black" value="Roblox">Roblox</option>
              </select>
            </div>

            <div className="flex  justify-center align-center flex-col">
              <p className='text-white text-xl'>Linguagem</p>
              <select
                className='border-0 bg-transparent text-white text-center'
                name="filter-language"
              >
                <option className="text-black" value="Todas">Todas </option>
                <option className="text-black" value="Lua">Lua</option>
                <option className="text-black" value="Visual">Visual</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex pl-8 gap-4 flex-wrap">
          {challenges.map(challenge => (
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

export async function getStaticProps() {
  const challenges = await loadChallenges();
  return {
    props: {
      challenges
    }
  }
}
