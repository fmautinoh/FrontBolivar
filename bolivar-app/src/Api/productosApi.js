import axios from "axios";

const prodapi = axios.create({
  baseURL: "https://wsbolivar/api", // Cambia la baseURL a "/api"
});

const tpprodapi = axios.create({
    baseURL: "https://wsbolivar/api", // Cambia la baseURL a "/api"
  });

export const getProd = async () => {
   // Añade "/clients" al inicio de la ruta
  const res = await prodapi.get("/Producto");
  return res.data;
};

export const gettpProd = async () => {
    // Añade "/clients" al inicio de la ruta
   const res = await tpprodapi.get("/TipoProducto");
   return res.data;
 };
 

export const Createprod = async (clientes) => {
  const res = await prodapi.post("/Producto/GuardarProducto", clientes); // Añade "/clients" al inicio de la ruta
  return res.data;
};

export const UpdateProd = async (clientes, idCliente) => {
  try {
    const response = await prodapi.put(`/Producto/UpdateProducto/${idCliente}`, clientes); // Añade "/clients" al inicio de la ruta
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DeleteProd = async (idCliente) => {
    try {
      const response = await prodapi.delete(`/Producto/DeleteProducto/${idCliente}`); // Añade "/clients" al inicio de la ruta
      return response.data;
    } catch (error) {
      throw error;
    }
  };
