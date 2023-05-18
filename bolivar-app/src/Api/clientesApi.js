import axios from "axios";

const clienteapi = axios.create({
  baseURL: "https://wsbolivar/api", // Cambia la baseURL a "/api"
});

export const getClientes = async () => {
   // Añade "/clients" al inicio de la ruta
  const res = await clienteapi.get("/cliente");
  return res.data;
};

export const CreateCliente = async (clientes) => {
  const res = await clienteapi.post("/Cliente/GuardarCliente", clientes); // Añade "/clients" al inicio de la ruta
  return res.data;
};

export const UpdateCliente = async (clientes, idCliente) => {
  try {
    const response = await clienteapi.put(`Cliente/UpdateCliente/${idCliente}`, clientes); // Añade "/clients" al inicio de la ruta
    console.log(clientes);
    return response.data;
  } catch (error) {
    throw error;
  }
};
