"use client";
import { useState } from "react";

// Opciones de marcas y modelos
const opcionesMarcas = {
  Ford: ["Fiesta", "Focus", "Ranger"],
  Toyota: ["Corolla", "Hilux", "Yaris"],
  Volkswagen: ["Gol", "Polo", "Vento"],
  Renault: ["Clio", "Kangoo", "Sandero"],
  Chevrolet: ["Onix", "Cruze", "S10"],
  Peugeot: ["208", "308", "Partner"],
  Fiat: ["Palio", "Cronos", "Strada"],
};

export default function CotizarPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    marca: "",
    modelo: "",
    año: "",
    tipoSeguro: "Terceros",
    aseguradora: "Sancor Seguros",
  });

  // Generar los años desde 1970 hasta el año actual
  const opcionesAños = Array.from(
    new Array(new Date().getFullYear() - 1970 + 1),
    (_, i) => `${1970 + i}`
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Si cambia la marca, reiniciar el modelo seleccionado
    if (e.target.name === "marca") {
      setFormData({ ...formData, marca: e.target.value, modelo: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar solo nombre, apellido y email en Supabase
    const { nombre, apellido, email } = formData;

    const response = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, apellido, email }),
    });

    if (response.ok) {
      // Si se guardó correctamente en Supabase, abrir WhatsApp
      const mensaje =
        `Hola, quiero una cotización.\n\n` +
        `Nombre: ${formData.nombre}\n` +
        `Apellido: ${formData.apellido}\n` +
        `Email: ${formData.email}\n\n` +
        `Vehículo: ${formData.marca} ${formData.modelo} (${formData.año})\n` +
        `Tipo de seguro: ${formData.tipoSeguro}\n` +
        `Aseguradora preferida: ${formData.aseguradora}\n\n` +
        `¡Espero su respuesta!`;

      const numeroWhatsApp = "5492983560104"; // Número de WhatsApp
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
        mensaje
      )}`;

      window.open(url, "_blank"); // Abre WhatsApp en una nueva pestaña

      // Limpiar el formulario después de enviarlo
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        marca: "",
        modelo: "",
        año: "",
        tipoSeguro: "Terceros",
        aseguradora: "Sancor Seguros",
      });
    } else {
      alert("Error al registrar el cliente");
    }
  };

  return (
    <div>
      <h1>Formulario de Cotización</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Marca */}
        <select
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una marca</option>
          {Object.keys(opcionesMarcas).map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        {/* Modelo (Filtrado por marca seleccionada) */}
        <select
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un modelo</option>
          {formData.marca &&
            opcionesMarcas[formData.marca as keyof typeof opcionesMarcas]?.map(
              (modelo) => (
                <option key={modelo} value={modelo}>
                  {modelo}
                </option>
              )
            )}
        </select>

        {/* Año */}
        <select
          name="año"
          value={formData.año}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un año</option>
          {opcionesAños.map((año) => (
            <option key={año} value={año}>
              {año}
            </option>
          ))}
        </select>

        {/* Tipo de Seguro */}
        <select
          name="tipoSeguro"
          value={formData.tipoSeguro}
          onChange={handleChange}
        >
          <option value="Terceros">Terceros</option>
          <option value="Terceros Completo">Terceros Completo</option>
          <option value="Todo Riesgo">Todo Riesgo</option>
        </select>

        {/* Aseguradora */}
        <select
          name="aseguradora"
          value={formData.aseguradora}
          onChange={handleChange}
        >
          <option value="Sancor Seguros">Sancor Seguros</option>
          <option value="San Cristóbal">San Cristóbal</option>
          <option value="La Caja">La Caja</option>
          <option value="Federación Patronal">Federación Patronal</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
