import { BASE_PATH } from "../utils/constans";
import { authFetch } from "../utils/fetch";
//funcion para enviar la dirección a strapi
export async function createAddressApi(address, logout) {
  //logout es para los usuario al iniciar sessicion se mantiene al hacer el cambiio  se cierra automaticamente
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    //if (result.statusCode !== 200) throw "Error del servidor"; //throw salta directo al catch
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//peticion para optener la lista de las direcciones del usuario
export async function getAddressApi(idUser, logout) {
  try {
    //se utilizar el user= porque es usuario autenticado
    const url = `${BASE_PATH}/addresses?user=${idUser}`; //lista las direcciones de ese usuario //en caso de reconstruir la app fijarse en el detalle de userio por lo de strapi
    const result = await authFetch(url, null, logout); //los pedidos tipo get no tienen parametros ni body
    if (result.statusCode === 500) throw "Error del servidor"; //throw en caso que haya errores del servidor
    return result; //retonorna lo encontrado en la base datos de estrapi
  } catch (error) {
    console.log(error);
    return null;
  }
}
//Peteción para eliminar la lista
export async function deleteAddressApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idUser}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }, //no es necesario el body ya va todo en la url
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error del servidor"; //throw salta directamente al catch
    return true; //si se elimino correctamente
  } catch (error) {
    console.log(error);
    return false;
  }
}
//funcion para actualizar la dirección
export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
