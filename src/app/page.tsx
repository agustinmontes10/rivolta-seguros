"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Bienvenido a Rivolta Seguros</h1>
      <button onClick={() => router.push("/cotizar")}>Cotizar</button>
    </div>
  );
}
