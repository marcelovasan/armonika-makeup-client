import { getToken, hasExpiredToken } from "../api/token";

//para que solo las personas que esten logeadas tenddran acceso a ciertas pantallas
export async function authFetch(url, params, logout) {
  const token = getToken();
  if (!token) {
    //usuario no logeado
    logout(); //cierra seccion se ejecuta la funcion
  } else {
    if (hasExpiredToken(token)) {
      //Caso que paso el tiempo o algun inconveniente con el token y deslogueo
      //Token caducado
      logout(); //se cierra automaticamente la sessión
    } else {
      //si el token no ha expirado construye unos parametros personalizados
      const paramsTemp = {
        //paramitos temporales
        ...params,
        headers: {
          ...params?.headers, //? si no llega el token  primero lo comprueba
          Authorization: `Bearer ${token}`, //token para peticion autenticada
        },
      };
      try {
        //
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
