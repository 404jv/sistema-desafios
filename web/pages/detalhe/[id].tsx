import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Challenge } from "@/components/Card";

export default function Detalhe() {
  const [challenge, setChallenge] = useState<Challenge>()
  const router = useRouter()
  const challengeId = router.query.id as string
  
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/v1/challenges/${challengeId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar desafio');
        }
        const fetchedChallenge = await response.json();
        setChallenge(fetchedChallenge);
      } catch (error) {
        console.error('Erro ao buscar desafio:', error);
      }
    };
    if (challengeId) {
      fetchChallenge();
    }
  }, [challengeId]);

  if (!challenge) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header />
      <div className="mt-8 ml-16">
        <Link className="text-white text-lg underline" href='/' >{'<- Voltar'}</Link>
      </div>
      <main className="flex flex-col justify-center items-center gap-8 mt-16 mr-64 ml-64 ">
        <div className='w-full flex justify-between items-center'>
          <div>
            <h2 className='text-purple-900 font-bold text-3xl text-center mb-4'>🎯Github Profile</h2>
            <p className='text-gray-300 text-lg text-justify max-w-xl'>
              {challenge.description}
            </p>
          </div>
          <Image
            src={challenge.imageUrl}
            className='rounded-t-md object-cover'
            alt="Projeto foto"
            width={'360'}
            height={360}
          />
        </div>
        <div className='w-full flex justify-between items-center'>
          <div>
            <h2 className='text-purple-900 font-bold text-3xl text-center mb-4'>
              Checklist
            </h2>
            <div className="flex flex-col text-center align-center justify-center text-gray-300 text-lg">
              {challenge.todos.map(todo => (
                  <div key={todo.id} className='flex gap-2 items-center'>
                    <input type="checkbox" id={todo.id} />
                    <label htmlFor={todo.id}>{todo.title}</label>
                  </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-purple-900 font-bold text-3xl text-center mb-4'>
              🏆Entregar
            </h2>
            <div className='flex flex-col justify-center align-center gap-2'>
              <p className="text-gray-300 text-base text-justify max-w-sm">
              Envia sua solução no GitHub e coloque o link do repositório abaixo. Após isso, espere a correção e veja sua nota.
              </p>
              <input placeholder="Ex: https://github.com/404jv/desafio-01" className="bg-black-700 rounded h-9 p-2 text-white" type="text" />
              <button 
                className="bg-blue self-center text-white p-1 rounded-lg mt-2 w-36 text-lg hover:bg-blue-700 font-bold py-2 px-4 rainbow-hover"
                type="submit">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

