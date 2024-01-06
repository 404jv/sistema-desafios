import { Circle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className="bg-black-800 rounded-md min-w-64">
      <Image
        src={'https://picsum.photos/200'}
        className='rounded-t-md object-cover min-w-64 max-h-40'
        alt="Projeto foto"
        width={'190'}
        height={190}
      />
      <h3 className="text-white font-bold text-center mt-2 text-xl">Github Profile</h3>
      <div className="flex flex-col ml-2">
        <div className="font-bold text-green flex gap-2 ">
          <Circle className="bg-green rounded-full mt-1" width={14} height={14} color='rgb(29 186 84)' />
          <span>Python</span>
        </div>
        <div className="font-bold text-red-500 flex gap-2 ">
          <Circle className="bg-red-500 rounded-full mt-1" width={14} height={14} color='rgb(239 68 68)' />
          <span>Minecraft</span>
        </div>
        <div className="font-bold text-blue flex gap-2 ">
          <Circle className="bg-blue rounded-full mt-1" width={14} height={14} color='rgb(0 133 255)' />
          <span>Fácil</span>
        </div>
      </div>
      <div className='h-size flex justify-center mb-2 min-w-4'>
        <Link className="text-white bg-black-700 mt-2 mb-1 pl-5 pr-5 pt-1 pb-1 rounded text-center hover:opacity-40" href="/detalhe">Ver mais</Link>
      </div>
    </div>
  )
}