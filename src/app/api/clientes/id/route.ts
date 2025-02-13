import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
// DELETE: Eliminar cliente por ID (desde la URL)
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id"); // Tomamos el ID desde la URL

  if (!id) {
    return NextResponse.json(
      { error: "Se requiere un ID de cliente" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("clientes").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Cliente eliminado correctamente" },
    { status: 200 }
  );
}
