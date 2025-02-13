import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// DELETE: Eliminar cliente por ID (desde la URL)

export async function DELETE(
  req: NextRequest
) {
  const id = req.nextUrl.searchParams.get('id'); // Tomamos el ID desde la URL

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
