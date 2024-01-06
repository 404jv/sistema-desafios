import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
      <header className="bg-black-800 w-full flex items-center justify-between h-20 p-8">
      <Image
        width={40}
        height={40}
        src={'/emoji.png'}
        alt="emoji"
      />
      <h1 className="text-purple-900 font-bold text-xl">
        <Link href="/">Sistema Desafios</Link>
      </h1>
    </header>
  )
}
