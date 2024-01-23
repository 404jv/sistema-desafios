import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Challenge } from "@/components/Card";
import Confetti from "react-confetti";
import ConfettiWrapper from "@/components/ConfettiWrapper";

type UserStatus = {
  repoUrl: string;
  challengeId: string;
  userId: string;
  id: string;
  status: string;
  grade: number | null
}
export default function Detalhe() {
  const [challenge, setChallenge] = useState<Challenge>()
  const [userStatus, setUserStatus] = useState<UserStatus | null>()
  const router = useRouter()
  const challengeId = router.query.id as string
  const [repoUrl, setRepoUrl] = useState<string>('')
  const [showConfetti, setShowConfetti] = useState(false); 
  const [sended, setSended] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userToken = localStorage.getItem('token@sistemadesafios')
    try {
      const response = await fetch(`${process.env.baseUrl}/challenges/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          repoUrl,
          challengeId,
        }),
      });
      if (response.status === 401) {
        localStorage.removeItem('user@sistemadesafios')
        localStorage.removeItem('token@sistemadesafios')
        router.push('/login')
        return;
      }
      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.message);
      }
      setShowConfetti(true);
      setSended(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('token@sistemadesafios');
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`${process.env.baseUrl}/challenges/${challengeId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          alert(errorResponse.message);
          router.push('/')
          return;
        }
        const fetchedChallenge = await response.json();
        setChallenge(fetchedChallenge.challenge);
        setUserStatus(fetchedChallenge.userStatus)
      } catch (error) {
        console.error('Erro ao buscar desafio:', error);
      }
    };
    if (challengeId) {
      fetchChallenge();
    }
    if (!!userStatus) {
      setSended(true)
      setShowConfetti(true)
    }
  }, [challengeId, router, userStatus]);

  if (!challenge) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header />
      <div className="mt-8 ml-16">
        <Link className="text-white text-lg underline" href='/' >{'<- Voltar'}</Link>
      </div>
      <main className="h-size flex flex-col justify-center items-center gap-16 mb-16">
        <Image
          src={challenge.imageUrl}
          className='rounded-t-md object-cover'
          alt="Projeto foto"
          width={460}
          height={460}
        />
        <div>
          <h2 className='text-purple-900 font-bold text-3xl text-center mb-4'>🎯Github Profile</h2>
          <p className='text-gray-300 text-lg text-justify max-w-xl'>
            {challenge.description}
          </p>
        </div>
        <div className="text-center flex flex-col justify-center items-center">
          <h2 className='text-purple-900 font-bold text-3xl text-center mb-4'>
            ✅Checklist
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
        {showConfetti && <ConfettiWrapper numberOfPieces={100} />}

        <div>
          <h2 className='text-purple-900 font-bold text-3xl text-center mb-4'>
            🏆Entregar
          </h2>
          <form method="POST" onSubmit={handleSubmit} className='flex flex-col justify-center align-center gap-2'>
            <p className="text-gray-300 text-base text-justify max-w-sm">
              Envia sua solução no GitHub e coloque o link do repositório abaixo. Após isso, espere a correção e veja sua nota.
            </p>
            <input 
              placeholder="Ex: https://github.com/404jv/desafio-01"
              className={`bg-black-700 rounded h-9 p-2 text-white ${sended && 'hidden'}`}
              type="text"
              name="repoUrl"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <button 
              className="bg-blue shadow-buttonBlue self-center text-white p-1 rounded-lg mt-2 w-36 text-lg hover:bg-blue-700 hover:shadow-none font-bold py-2 px-4 rainbow-hover disabled:bg-green disabled:hover:bg-none"
              type="submit"
              disabled={sended}
            >
              {sended ? 'Enviado' : 'Enviar'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

