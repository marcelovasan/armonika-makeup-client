import React, { useState, useEffect } from "react";
import { flatMap, map, size } from "lodash"; //libreria para poder usar las funciones de js nativo
import { Grid, Button } from "semantic-ui-react"; //libreria para pora diseñar mejor la web
import { getAddressApi, deleteAddressApi } from "../../../api/address"; //listar la peticion del api del usuario
import useAuth from "../../../hooks/useAuth"; //para optener el id  del usuario
//props para recuperar loe enviado en el account
//funcion principal primero se recupera por aca los props luego se envia a address
export default function ListAddress(props) {
  const { reloadAddresses, setReloadAddresses, openModal } = props; //Preparandose para usar el estado enviado
  const [addresses, setAddresses] = useState(null); //estado para la lista de direcciones enpieza como nulo sin direcciones
  const { auth, logout } = useAuth(); //para optener el usuario, auth es para los datos dle usuario y el logout para cerrar la peiicion
  //   console.log(addresses);//para ver si no esta devolviendo el array del todo
  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })(); //(***)() funcion que se ejecuta automaticamente
  }, [reloadAddresses]); //cada ves que ocurra un cambio en reloeadaddresses se ejecutara de nuevo el efecto es decir pasa a false el setreload
  //si addresses en nulo para que no cargue vacio
  if (!addresses) return null;
  return (
    /*size calcula el tamaño del array que se le envia en el adrres*/
    //se validad si no existe una dirreción o igual a cero si existe listare de acuerdo a los dispositivos
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>Usted no tiene direcciones creadas agregue una dirección</h3>
      ) : (
        //addres lo que se recibe por la consola con los datos de cada dirreción
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={16} computer={4}>
              {/*Tamaño de las columnas de acuerdo al dispositovo*/}
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}
//funcion para listar el arry de manera ordenanda
function Address(props) {
  const { address, logout, setReloadAddresses, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false); //estado para cargar cuando se este eliminando una dirreción
  //funcion para eliminar dirreciones
  const deleteAddress = async () => {
    //cuando se usar el await se usar async si o si
    // console.log(address._id);//devuelve el id de la
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) setReloadAddresses(true); //si la peticion es correcta pasa la funcion a ser verdadera
    setLoadingDelete(false);
  };
  //console.log(props);//validar las direccion si esta apareciendo
  return (
    //bloque de dirrecciones el orden tu decides como listarlas de manera que te guste
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>DNI O Carnet: {address.edentity}</p>
      <p>{address.address}</p>
      <p>Región: {address.state}</p>
      <p>Ciudad: {address.city}</p>
      <p>C° Postal: {address.postalCode}</p>
      <p>N° Celular: {address.phone}</p>
      <p>Referencia: {address.reference}</p>
      <div className="actions">
        {/*funcion que llama al modal para listar*/}
        <Button
          className="editar"
          onClick={() => openModal(`Editar: ${address.title}`, address)}
          primary
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete} color="red">
          Eliminar
        </Button>
      </div>
    </div>
  );
}
