import Card from "@/components/Card";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        <div className='flex flex-row items-center h-size justify-between pl-8 pr-8 mt-16 mb-4'>
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
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </div>
  )
}
