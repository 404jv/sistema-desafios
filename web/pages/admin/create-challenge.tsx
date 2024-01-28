import Header from "@/components/Header";
import Tags from "@/components/Tags";
import Todos from "@/components/Todos";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateChallenge() {
  const router = useRouter()
  const [checklistItems, setChecklistItems] = useState<string[]>(['']);
  const [tagList, setTagList] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    todos: [],
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    Object.assign(formData, {
      todos: checklistItems,
      tags: tagList,
    })
    const accessToken = localStorage.getItem('token@sistemadesafios');
    try {
      const response = await fetch(`${process.env.baseUrl}/challenges/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.message);
        return;
      }
      alert('Desafio criado com sucesso')
      resetAllFields()
    } catch (error) {
      console.error(error);
    }
  }

  function resetAllFields() {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      todos: [],
    })
    setChecklistItems([])
    setTagList([])
  }

  useEffect(() => {
    const token = localStorage.getItem('token@sistemadesafios');
    const userString = localStorage.getItem('user@sistemadesafios');
    if (!token || !userString) {
      router.push('/login');
      return;
    }
    const user = JSON.parse(userString)
    if (user.isAdmin !== true) {
      alert('Acesso negado.')
      router.push('/home');
      return;
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="mb-32">
      <Header />

      <div className="mt-8 ml-16">
        <Link className="text-white text-lg underline" href='/home' >{'<- Voltar'}</Link>
      </div>

      <main className="w-full flex flex-col text-center justify-center mt-16">
        <h1 className="text-purple-900 text-center font-bold text-2xl">Criação de Desafio</h1>

        <form onSubmit={handleSubmit} action="POST" className='flex flex-col justify-center items-center content-center'>
          <div className="flex flex-col text-start text-white mt-4">
            <label className="mb-1 font-bold">Título</label>
            <input
              required
              className="bg-black-700 rounded w-72 h-9 p-2" 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-start text-white mt-4">
            <label className="mb-1 font-bold">Descrição</label>
            <textarea
              required
              className="bg-black-700 rounded w-72 p-2" 
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-start text-white mt-4">
            <label className="mb-1 font-bold">URL da imagem</label>
            <input
              required
              className="bg-black-700 rounded w-72 h-9 p-2" 
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <Todos checklistItems={checklistItems} setChecklistItems={setChecklistItems} />
          <Tags setTagsList={setTagList} tagsList={tagList} />
          <button 
            className="bg-blue shadow-buttonBlue text-white p-2 rounded-lg mt-8 w-40 text-lg hover:bg-blue-700 hover:shadow-none font-bold py-2 px-4 rainbow-hover"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  )
}
