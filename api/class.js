//Api para conectarse a las clases o categorias de los productos
import { BASE_PATH } from "../utils/constans";
//funcion para listar las aplicaciones
export async function getClassesApi() {
  try {
    const url = `${BASE_PATH}/classes?_sort=position:asc`; //_sort=position:asc para ordenar de forma ascendente
    const responde = await fetch(url); //para hacer peticiones asincronas en http
    const result = await responde.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
