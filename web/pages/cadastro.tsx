import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('http://:3333/api/v1/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.message);
        return;
      }
      router.push('/login');
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

  return (
    <main className="h-screen flex items-center justify-center text-center">
      <div className="bg-black-800 w-96 p-4 rounded-md">
        <h1 className="text-purple-900 font-bold text-2xl">
          CADASTRO
        </h1>
        <form method="POST" onSubmit={handleSubmit} className='flex flex-col justify-center items-center content-center'>
          <div className="flex flex-col text-start text-white mt-4">
            <label className="mb-1 font-bold">Nome Completo</label>
            <input
              required 
              className="bg-black-700 rounded w-72 h-9 p-2" 
              type="text"
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
          <div className="flex flex-col text-start text-white mt-4">
            <label className="mb-1 font-bold">Senha</label>
            <input
              required 
              className="bg-black-700 rounded w-72 h-9 p-2"
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-start text-white mt-4">
            <label className="mb-1 font-bold">Confirmar Senha</label>
            <input
              required 
              className="bg-black-700 rounded w-72 h-9 p-2"
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span className='text-start text-white text-sm mt-1'>
              Já é membro? {' '}
              <Link 
                className='text-purple-900 underline hover:text-purple-800' 
                href="/login"
              >
                Faça seu login
              </Link>
            </span>
          </div>
          <button 
            className="bg-blue text-white p-2 rounded-lg mt-8 w-40 text-lg hover:bg-blue-700 font-bold py-2 px-4 rainbow-hover"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  )
}
