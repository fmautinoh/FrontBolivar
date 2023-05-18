import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Pagination, Modal, ButtonGroup } from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { gettpProd, getProd, Createprod, UpdateProd, DeleteProd } from '../Api/productosApi';
import NavigationBar from './NavigationBar';


const Productos = () => {
  const [idProd, setidprod] = useState('');
  const [nomProd, setnomprod] = useState('');
  const [idTipPro, setidTipPro] = useState('');
  const [precioProd, setprecioProd] = useState('');
  const [durProd, setdurProd] = useState('');
  const [isInsertd, setisInsert] = useState(true);
  const [products, setProducts] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [formValues, setFormValues] = useState({
    idProd: '',
    nomProd: '',
    idTipPro: '',
    precioProd: '',
    durProd: '',
  });
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['prods'],
    queryFn: getProd,
    onSuccess: (data) => {
      setProducts(data);
    },
    select: products => products.sort((a,b)=>b.idProd - a.idProd)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    async function obtenerOpciones() {
      const respuesta = await gettpProd();
      const datos = respuesta;
      setOpciones(datos);
    }

    obtenerOpciones();
  }, []);

  const handleEdit = (index) => {
    //console.log(index);
    setFormValues(products[index]);
    setEditIndex(index);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      Createprod(formValues)
      queryClient.invalidateQueries('prods');

    } else {
        UpdateProd(formValues, products[editIndex].idProd)
        queryClient.invalidateQueries('prods');
        setEditIndex(-1);
    }
    setFormValues({
      idProd: '',
      nomProd: '',
      idTipPro: '',
      precioProd: '',
      durProd: '',
    });
  };

  const handleDelete = (index) => {
    DeleteProd(products[index].idProd);
    queryClient.invalidateQueries('prods');
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Define cuántos elementos por página quieres mostrar
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(products.length / itemsPerPage);
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
    <>
      <NavigationBar />
      <div>
        <div className='container justify-content-center'>
          {isInsertd && (
            <Form onSubmit={handleSubmit} className="row g-6">
              <div className="col-auto">
                <Form.Group controlId="idProd" hidden>
                  <Form.Label>Id Producto</Form.Label>
                  <Form.Control type="text" name="idProd" value={formValues.idProd} readOnly hidden />
                </Form.Group>
              </div>
              <div className="col-4">
                <Form.Group controlId="nomProd" >
                  <Form.Label>Nombre Producto</Form.Label>
                  <Form.Control type="text" name="nomProd" value={formValues.nomProd ?? ''} onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col-3">
                <Form.Group controlId="idTipPro" >
                  <Form.Label>Tipo Producto</Form.Label>
                  <Form.Select type="text" name="idTipPro" value={formValues.idTipPro} onChange={handleChange}>
                    <option value="0">Seleccione un Tipo</option>
                    {opciones.map((opcion) => (
                      <option key={opcion.idTipPro} value={opcion.idTipPro}>
                        {opcion.tipoPro}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-2">
                <Form.Group controlId="precioProd" >
                  <Form.Label>Precio Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="precioProd"
                    value={formValues.precioProd}
                    onChange={handleChange}

                  />
                </Form.Group>
              </div>
              <div className="col-2">
                <Form.Group controlId="durProd" >
                  <Form.Label>Duración Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="durProd"
                    value={formValues.durProd}
                    onChange={handleChange}

                  />
                </Form.Group>
              </div>
              <Button variant="primary" type="submit" className="btn btn-primary">
              {editIndex === -1 ? 'Agregar' : 'Guardar Edición'}
              </Button>
            </Form>
          )}
        </div>
        <div className='container justify-content-center col-12'>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Nombre Producto</th>
                <th>ID Tipo Producto</th>
                <th>Precio Producto</th>
                <th>Duración Producto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product, index) => (
                <tr key={index}>
                  <td>{product.idProd}</td>
                  <td>{product.nomProd}</td>
                  <td>{product.idTipPro === 1 ? 'Congelado':'No Congelado'}</td>
                  <td>{product.precioProd}</td>
                  <td>{product.durProd}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(index)}>
                      Editar
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-center">{renderPaginationItems()}</Pagination>
        </div>
      </div>


    </>
  );
};

export default Productos;
