import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: Obtener todos los clientes
export async function GET() {
  const { data, error } = await supabase.from("clientes").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// POST: Crear un cliente nuevo
export async function POST(req: Request) {
  const { email, nombre, apellido } = await req.json();

  if (!email || !nombre || !apellido) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("clientes")
    .insert([{ email, nombre, apellido }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
