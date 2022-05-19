import { BASE_PATH } from "../utils/constans"; //importa la conexion para el api del url
import { authFetch } from "../utils/fetch";

//endpint punto de acceso a strapi
export async function registerApi(formData) {
  //funsion para registrar el usuario
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordApi(email) {
  //funsion para recetear el correo del usuario
  try {
    const url = `${BASE_PATH}/auth/forgot-password`; //ruta del enpoint para resetear la url del usuario
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${BASE_PATH}/users/me`; //endpoint del usuario autenticado  o logout
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//endpoint para poder actualizar el usuario de strapi
export async function updateNameApi(idUser, data, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`; //enpoint para conectarse a strapi.
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout); //para que se pueda actualizar la informacion
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// funcion para actualizar el email
export async function updateEmailApi(idUser, email, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT", //al actualizar un dato se usa el metodo put
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//función para actuaalizar la contraseña del usuario
export async function updatePasswordApi(idUser, password, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`; //endpoint para la conexion a la base datos
    const params = {
      //parametros para enviar el
      method: "PUT", //siempre se usa put en stripe para actualizar los datos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
