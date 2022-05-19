import React, { useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; //toast para la ventanas de esa clase es para todo el proyecto
import AuthContext from "../context/AuthContext"; //importa el contexto a esta pantalla principal
import jwtDecode from "jwt-decode"; //para decodificar el token que se genera por el usuario
import { useRouter } from "next/router"; //para administrar las rutas del usuario
import { setToken, getToken, removeToken } from "../api/token"; //importacion del token
import CartContext from "../context/CartContext"; //carrito
import {
  getProductCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
} from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css"; //importacion para poder usar el toast de manera efectiva si no se importa no se podra usar el toast
// para el funcionanmiento del carrucel de la fotos
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  //use effect para que el login sea persistente a pesar del tiempo
  const [reloaduser, setReloadUser] = useState(false); //para forzar si se vuelve a ejecutar
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  //cuando setReloadUser pasa a true para poder pasarlo a true se vuelve a ejecutar de nuevo el efecto
  const router = useRouter(); //administra los rutas
  const [reloadCart, setReloadCart] = useState(false); //estado para que recargue el carrito del producto

  // console.log(totalProductsCart);

  //comprobacion de datos si existe el usuario
  useEffect(() => {
    const token = getToken(); //obtener el token del local storage del componente que lo almacena en la funsion
    if (token) {
      //verifica si existe un token en el local storage y retorno el id
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null); //retorna el valor nulo si el usuario no existe o tambien para setearlo como null
    }
    setReloadUser(false);
  }, [reloaduser]); //recarga el useeffect cuando se sea necesario

  //uso pra el carrito
  useEffect(() => {
    setTotalProductsCart(countProductsCart);
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    //funsion que se ejecuta desde cualquier componente o parte  lo que espera el token
    setToken(token); //Ejecuta el token y seteea el local storage
    //console.log(jwtDecode(token)); //esto decodifica el token que se genera para optoner el id del usuario
    setAuth({
      //setea el token importado del estado en la pantalla principal
      token, //setea el token en la pantalla principal
      idUser: jwtDecode(token).id, //decodifica el id del token.
    });
  };
  const logout = () => {
    if (auth) {
      removeToken(); //ejecuta la funcion para eliminar el token
      setAuth(null); //el usuario se vuelve nulo
      //si se deslogue automaticamente se redirege a la home
      router.push("/"); //redirige a la home o al inicio
    }
  };

  const addProduct = (product) => {
    // console.log(auth);
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar un producto tienes que inicar sección");
    }
  };

  //función para eliminar el producto
  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  //para el manejo del usuario
  const authData = useMemo(
    () => ({
      auth, // Setea la funcion del login de manera que cuantas veces recargue no pasa nada  para mantener el valor del estado
      login,
      logout,
      setReloadUser, // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    [auth] //memo se actualiza cuando cambia de valor el auth
    //si se pone otro valor no funciona la actualizacion
  );

  //para manejar el estado del usuario
  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductCart: getProductCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductCart: () => null,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null; //si no hay datos en el local storage retorna null para que sea undefine

  return (
    <AuthContext.Provider value={authData}>
      {/*Se usa de manera general para mantenerlo en cualquier lugar sin que se pierda nada*/}
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        {/*Muestra mensaje de error en la parte superior derecha y se cierra automaticamente  // hideProgressBa,closeOnClick propiedades del toast */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
