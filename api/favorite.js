import { BASE_PATH } from "../utils/constans";
import { authFetch } from "../utils/fetch"; //autenticación
import { size } from "lodash";

//conexiones hacia la base de datos
//funcion para saber si es favorito o no el producto
export async function isFavoriteApi(idUser, idProduct, logout) {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}&product=${idProduct}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(idUser, idProduct, logout) {
  try {
    //validacion para que pueda agregar a productos
    const dataFound = await isFavoriteApi(idUser, idProduct, logout);
    //si variable es mayor a cero o es diferente de nulo ya esta en favoritos
    if (size(dataFound) > 0 || !dataFound) {
      return "Este producto ya esta en tu lista de favoritos";
    } else {
      const url = `${BASE_PATH}/favorites`;
      const params = {
        method: "POST",
        headers: {
          //esto siempre son misnusculas
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: idUser, product: idProduct }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteFavoriteApi(idUser, idProduct, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idProduct, logout);
    if (size(dataFound) > 0) {
      const url = `${BASE_PATH}/favorites/${dataFound[0]._id}`; //Recibe todos los datos y cogemos los id
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}`; //consulta tipo where el usuario debe ser igual a usuario de la consulta
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
