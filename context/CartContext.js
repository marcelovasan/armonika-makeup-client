import { createContext } from "react";

//Contexto para el estado del carrito
const CartContext = createContext({
  productsCart: 0,
  addProductCart: () => null,
  getProductCart: () => null,
  removeProductCart: () => null,
  removeAllProductCart: () => null,
});

//exportación del carrito
export default CartContext;
