import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateStudent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    name: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = sessionStorage.getItem('token@sistemadesafios');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const body = await response.json();
      if (!response.ok) {
        alert(body.message);
        return;
      }
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (router.query.userData) {
      const decodedData = decodeURIComponent(router.query.userData as string);
      const userDataObject = JSON.parse(decodedData);
      setFormData(userDataObject);
    }
  }, [router.query.userData]);

  return (
    <>
      <Header />
      <div className="mt-8 ml-16">
        <Link className="text-white text-lg underline" href='/admin' >{'<- Voltar'}</Link>
      </div>
      <main className="h-screen flex flex-col items-center text-center">
      
        <div className="bg-black-800 w-96 min-h-96 p-4 rounded-md">
          <h1 className="text-purple-900 font-bold text-2xl">
            Editar Aluno
          </h1>
          <form method="POST" onSubmit={handleSubmit} className='flex flex-col justify-center items-center content-center'>
            <div className="flex flex-col text-start text-white mt-4">
              <label className="mb-1 font-bold">Nome Completo</label>
              <input
                required 
                className="bg-black-700 rounded w-72 h-9 p-2"
                type="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-start text-white mt-4">
              <label className="mb-1 font-bold">Usuário</label>
              <input
                required 
                className="bg-black-700 rounded w-72 h-9 p-2"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <button 
              className="bg-blue shadow-buttonBlue text-white p-2 rounded-lg mt-8 w-40 text-lg hover:bg-blue-700 hover:shadow-none font-bold py-2 px-4 rainbow-hover"
              type="submit">
              Enviar
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
