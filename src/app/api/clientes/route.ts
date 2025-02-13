import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

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
