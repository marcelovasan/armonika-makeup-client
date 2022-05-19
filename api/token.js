import jwtDecode from "jwt-decode";//descodifica los tokens
import {TOKEN} from "../utils/constans";

export function setToken(token){//funsion para almacenar en el local storage 
    localStorage.setItem(TOKEN,token);
}
export function getToken(){//funcion para obtener el token del usario del local storage
    return localStorage.getItem(TOKEN);//recupera el token del la funcion setToken o del local storage
};
export function removeToken(){//funcion para eliminar el token para para desloguearse
    localStorage.removeItem(TOKEN);//elimina el token que esta almacenado en el local storage   
};

export function hasExpiredToken(token){ //funcion que comprueba que si el token a inspirado o no ha expirado 
    const tokenDecode=jwtDecode(token);//asignar el token para poder descodificarlo
    const expireDate=tokenDecode.exp*1000;//obtienne la fecha de expiracion y lo multiplica por 1000 milesegundos se convierte en segundos 
    const currentDate = new Date().getTime();//Obtener la fecha actual 
    if(currentDate>expireDate){//si la fecha actual es mayor al token experición eso significa que el toke ha expirado
        return true;
    }
    return false;
};