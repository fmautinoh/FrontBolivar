// ClientForm.js
import React, { useState } from 'react';
import { Form, Button, Table, Pagination, Modal, ButtonGroup} from 'react-bootstrap';
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {getClientes,CreateCliente, UpdateCliente} from "../Api/clientesApi"
import NavigationBar from './NavigationBar'

const FormClients = () => {
  const [id_Cli, setidCli] = useState('');
  const [dni_Cli, setDniCli] = useState('');
  const [ruc_Cli, setRucCli] = useState('');
  const [nom_Cli, setNomCli] = useState('');
  const [apat_Cli, setApatCli] = useState('');
  const [amat_Cli, setAmatCli] = useState('');
  const [tel_Cli, setTelCli] = useState('');
  const [cor_Cli, setCorCli] = useState('');
  const [dir_Cli,setDirCli] = useState('');
  const [clients, setClients] = useState([]);
  const [isselected, setisselected] = useState(false);
  const [isselectedenv, setisselectedenv] = useState(true);
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['clients'],
    queryFn: getClientes,
    onSuccess: (data) => {
      setClients(data);
    },
    select: clients => clients.sort((a,b)=>b.idCli - a.idCli)
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newClient = {
      dni_Cli,
      ruc_Cli,
      nom_Cli,
      apat_Cli,
      amat_Cli,
      tel_Cli,
      cor_Cli,
      dir_Cli,
    };
  
    try {
      // Llama a la función CreateCliente y espera su resultado
      await CreateCliente(newClient);
      queryClient.invalidateQueries('clients');
      // Actualiza la lista de clientes y limpia el formulario
      setClients([...clients, newClient]);
      setDniCli('');
      setRucCli('');
      setNomCli('');
      setApatCli('');
      setAmatCli('');
      setTelCli('');
      setCorCli('');
      setDirCli('');
    } catch (error) {
      // Maneja el error, por ejemplo, mostrando un mensaje al usuario
      console.error('Error al crear el cliente:', error);
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Define cuántos elementos por página quieres mostrar
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLLenarData = (client) => {
    const clienteEncontrado = {
      cliente: {
        idCli: client.idCli,
        nomCli: client.nomCli,
        app: client.apatCli,
        apm: client.amatCli,
        cor: client.corCli,
        telf: client.telCli,
        dir: client.dirCli,
        dni: client.dniCli,
        ruc: client.rucCli
      }
    };
    setidCli(clienteEncontrado.cliente.idCli),
    setDniCli(clienteEncontrado.cliente.dni),
    setRucCli(clienteEncontrado.cliente.ruc),
    setNomCli(clienteEncontrado.cliente.nomCli),
    setApatCli(clienteEncontrado.cliente.app),
    setAmatCli(clienteEncontrado.cliente.apm),
    setTelCli(clienteEncontrado.cliente.telf),
    setCorCli(clienteEncontrado.cliente.cor),
    setDirCli(clienteEncontrado.cliente.dir),
    setisselected(true),
    setisselectedenv(false)
  };

  const handleUpdate = async (event) =>{
    event.preventDefault();
    const newClientu = {
      id_Cli,
      dni_Cli,
      ruc_Cli,
      nom_Cli,
      apat_Cli,
      amat_Cli,
      tel_Cli,
      cor_Cli,
      dir_Cli,
    };
    try {
      await UpdateCliente(newClientu,newClientu.id_Cli);
      queryClient.invalidateQueries('clients');
      setClients([...clients, newClientu]);
      setDniCli('');
      setRucCli('');
      setNomCli('');
      setApatCli('');
      setAmatCli('');
      setTelCli('');
      setCorCli('');
      setDirCli('');
    setisselected(false),
    setisselectedenv(true)
    } catch (error) {
      console.error('Error al Actualizar el cliente:', error);
    }
  };

  // Calcula el número total de páginas
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const renderPaginationItems = () => {
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  if (isLoading) {
    return <div>Loading.....</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <NavigationBar/>
      <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h2>Formulario de ingreso de clientes</h2>
          {isselectedenv && <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="dniCli">DNI</label>
              <input type="text" className="form-control" id="dniCli" placeholder="Ingrese el DNI" value={dni_Cli} onChange={(e) => setDniCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="rucCli">RUC</label>
              <input type="text" className="form-control" id="rucCli" placeholder="Ingrese el RUC" value={ruc_Cli ?? null} onChange={(e) => setRucCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="nomCli">Nombre</label>
              <input type="text" className="form-control" id="nomCli" placeholder="Ingrese el nombre" value={nom_Cli} onChange={(e) => setNomCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="apatCli">Apellido paterno</label>
              <input type="text" className="form-control" id="apatCli" placeholder="Ingrese el apellido paterno" value={apat_Cli} onChange={(e) => setApatCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="amatCli">Apellido materno</label>
              <input type="text" className="form-control" id="amatCli" placeholder="Ingrese el apellido materno" value={amat_Cli} onChange={(e) => setAmatCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="telCli">Teléfono</label>
              <input type="text" className="form-control" id="telCli" placeholder="Ingrese el teléfono" value={tel_Cli} onChange={(e) => setTelCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="corCli">Correo electrónico</label>
              <input type="email" className="form-control" id="corCli" placeholder="Ingrese el correo electrónico" value={cor_Cli} onChange={(e) => setCorCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="dirCli">Dirección</label>
              <input type="text" className="form-control" id="dirCli" placeholder="Ingrese la dirección" value={dir_Cli} onChange={(e) => setDirCli(e.target.value)} />
            </div>
            <Button variant="primary" type="submit" className="btn btn-primary">
              Enviar
            </Button>
          </Form>}

          {isselected && <Form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="dniCli">DNI</label>
              <input type="text" className="form-control" id="dniCli" placeholder="Ingrese el DNI" value={dni_Cli} onChange={(e) => setDniCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="rucCli">RUC</label>
              <input type="text" className="form-control" id="rucCli" placeholder="Ingrese el RUC" value={ruc_Cli ?? ''} onChange={(e) => setRucCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="nomCli">Nombre</label>
              <input type="text" className="form-control" id="nomCli" placeholder="Ingrese el nombre" value={nom_Cli} onChange={(e) => setNomCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="apatCli">Apellido paterno</label>
              <input type="text" className="form-control" id="apatCli" placeholder="Ingrese el apellido paterno" value={apat_Cli} onChange={(e) => setApatCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="amatCli">Apellido materno</label>
              <input type="text" className="form-control" id="amatCli" placeholder="Ingrese el apellido materno" value={amat_Cli} onChange={(e) => setAmatCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="telCli">Teléfono</label>
              <input type="text" className="form-control" id="telCli" placeholder="Ingrese el teléfono" value={tel_Cli} onChange={(e) => setTelCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="corCli">Correo electrónico</label>
              <input type="email" className="form-control" id="corCli" placeholder="Ingrese el correo electrónico" value={cor_Cli} onChange={(e) => setCorCli(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="dirCli">Dirección</label>
              <input type="text" className="form-control" id="dirCli" placeholder="Ingrese la dirección" value={dir_Cli} onChange={(e) => setDirCli(e.target.value)} />
            </div>
            <Button variant="warning" type="submit" className="btn btn-primary">
              Guardar Cambios
            </Button>
          </Form>}
        </div>
        <div className="col-md-8">
          <h2>Lista de clientes</h2>
          <Table striped bordered hover className="table table-info table-striped">
            <thead>
              <tr>
                <th>DNI</th>
                <th>RUC</th>
                <th>Nombre y Apellidos</th>
                <th>Teléfono</th>
                <th>Correo electrónico</th>
                <th>Dirección</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
          {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((client, index) => (
            <tr key={index} id={client.idCli}>
              <td>{client.dniCli}</td>
                  <td>{client.rucCli}</td>
                  <td>{client.nomCli}  {client.apatCli}  {client.amatCli}</td>
                  <td>{client.telCli}</td>
                  <td>{client.corCli}</td>
                  <td>{client.dirCli}</td>
                  <td>
                  <Button variant="primary" onClick={() => handleLLenarData(client)}>Editar</Button>
                  </td>
            </tr>
          ))}
      </tbody>
          </Table>
          <Pagination className="justify-content-center">{renderPaginationItems()}</Pagination>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default FormClients;
