import { Circle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";


type Tags = {
  id: string;
  title: string;
  challengeId: string;
}

type Todos = {
  id: string;
  title: string;
  challengeId: string;
}

export type Challenge = {
  id: string
  description: string
  imageUrl: string
  title: string
  tags: Tags[]
  todos: Todos[]
}

type Props = {
  challenge: Challenge
}

export default function Card({ challenge }: Props) {
  function isValidUrl(url: string): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    return urlPattern.test(url)
  }

  return (
    <div className="bg-black-800 rounded-md min-w-64">
      <Image
        src={isValidUrl(challenge.imageUrl) ? challenge.imageUrl : '/emoji.png'}
        className='rounded-t-md object-cover w-64 h-40'
        alt="Foto do projeto"
        width={190}
        height={190}
      />
      <h3 className="text-white font-bold text-center mt-2 text-xl">
        {
          challenge.title.length > 16 
            ? `${challenge.title.slice(0, 16)}...` 
            : `${challenge.title}`
        }
      </h3>
      <div className="flex flex-col ml-2">
        {challenge.tags.map(tag => (
          <Tag title={tag.title} key={tag.id} />
        ))}
      </div>
      <div className='h-size flex justify-center mb-2 min-w-4'>
        <Link 
          className="text-white bg-black-700 mt-2 mb-1 pl-5 pr-5 pt-1 pb-1 rounded text-center hover:opacity-40"
          href={`/detalhe/${challenge.id}`}
        >
          Ver mais
        </Link>
      </div>
    </div>
  )
}
