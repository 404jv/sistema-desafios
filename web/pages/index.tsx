import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('token@sistemadesafios');
    if (!token) {
      router.push('/login');
      return;
    }
    router.push('/home');
  }, [router])

  return (
    <p>Página inválida...</p>
  )
}
