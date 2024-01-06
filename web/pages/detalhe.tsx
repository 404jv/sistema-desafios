import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";

export default function Detalhe() {
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, voluptas accusantium alias iusto praesentium natus quam veritatis expedita quod quae nisi ullam eligendi, ut consequuntur voluptatibus rerum, quos blanditiis dolore.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, voluptas accusantium alias iusto praesentium natus quam veritatis expedita quod quae nisi ullam eligendi, ut consequuntur voluptatibus rerum, quos blanditiis dolore.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, voluptas accusantium alias iusto praesentium natus quam veritatis expedita quod quae nisi ullam eligendi, ut consequuntur voluptatibus rerum, quos blanditiis dolore.
            </p>
          </div>
          <Image
            src={'https://picsum.photos/200'}
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
              <div className='flex gap-2 items-center'>
                <input type="checkbox" id="todo1" name="vehicle3" value="Boat" />
                <label htmlFor="todo1">Iniciar Projeto</label>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" id="todo1" name="vehicle3" value="Boat" />
                <label htmlFor="todo1">Iniciar Projeto</label>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" id="todo1" name="vehicle3" value="Boat" />
                <label htmlFor="todo1">Iniciar Projeto</label>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" id="todo1" name="vehicle3" value="Boat" />
                <label htmlFor="todo1">Iniciar Projeto</label>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-purple-900 font-bold text-3xl text-center mb-4'>
              🏆Entregar
            </h2>
            <div className='flex flex-col justify-center align-center gap-2'>
              <p className="text-gray-300 text-base text-justify max-w-sm">
              Envia sua solução no GitHub e coloque o link do repositório abaixo. Após isso, espere a corração e veja sua nota.
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
