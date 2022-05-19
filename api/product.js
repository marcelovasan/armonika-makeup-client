//funciones que se conectan con strapi para los productos
import { BASE_PATH } from "../utils/constans";
//class esta declarado en strapi
//funcio para listar los productos mas recientes
export async function getLastProductApi(limit) {
  try {
    const limitItems = `_limit=${limit}`; //Limita la cantidad de carga de productos
    const sortItem = "_sort=createdAt:desc"; //Productos mas recientes de manera decendente
    const url = `${BASE_PATH}/products?${limitItems}&${sortItem}`; //? continua con y and o & se concatena
    const response = await fetch(url); //peticion sin autenticacion
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//funcion para consultar al api para conectarse a las categorias de las clases
//entra a la collecion de productos y dentro de eso busca la clase que pertenen los productos url es de la base de datos
export async function getProductsClassApi(classes, limit, start) {
  //start es pára las paginas de inicio
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`; //para la paginacion de los juegos
    const url = `${BASE_PATH}/products?class.url=${classes}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//funcion para saber la cantidad de juegos para la paginacion de paginas
export async function getTotalProductsClassApi(classes) {
  try {
    const url = `${BASE_PATH}/products/count?class.url=${classes}`; //count es para contar de acuerrdo a la urr de la class o categoria
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//funcion para listar las propiedades del juego

export async function getProductByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/products?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
//funcion para la busqueda de productos
export async function searchProductApi(title) {
  try {
    const url = `${BASE_PATH}/products?_q=${title}`; //funciona como where pero asincronas _q es una query
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
