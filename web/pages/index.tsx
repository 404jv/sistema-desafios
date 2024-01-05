import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div>
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

    <main>
       <div className='flex flex-row items-center h-size justify-between p-8'>
          <h2 className='text-purple-900 font-bold'>Desafios</h2>
          <div>
            <div>
              <p>Módulo</p>
              <select name="filter-modulos">
                <option value="Todos">Todos</option>
                <option value="Kodu">Kodu</option>
                <option value="Roblox">Roblox</option>
              </select>
            </div>

            <div>
              <p>Linguagem</p>
              <select name="filter-language">
                <option value="Todas">Todas</option>
                <option value="Lua">Lua</option>
                <option value="Visual">Visual</option>
              </select>
            </div>
          </div>
        </div> 
    </main>
  </div>
  )
}
