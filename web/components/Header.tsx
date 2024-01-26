import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()

  function logout() {
    localStorage.removeItem('user@sistemadesafios');
    localStorage.removeItem('token@sistemadesafios');
    router.push('/');
    return;
  }

  return ( 
      <header className="bg-black-800 w-full flex items-center justify-between h-20 p-8">
      <Image
        width={40}
        height={40}
        src={'/emoji.png'}
        alt="emoji"
      />
      <div className="flex gap-2">
        <h1 className="text-purple-900 font-bold text-xl">
          <Link href="/home">Sistema Desafios</Link>
        </h1>
        <button onClick={logout} className="text-red-500 font-bold">Sair</button>
      </div>
    </header>
  )
}
