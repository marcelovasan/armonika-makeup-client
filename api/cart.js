import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constans";

//funcion para obtener los productos del carrito
export function getProductCart() {
  const cart = localStorage.getItem(CART); //los productos se guardan en el local storage

  if (!cart) {
    return;
  } else {
    const products = cart.split(","); //se convierte en un array
    return products;
  }
}

//funcion para agregar productos al carrito
export function addProductCart(product) {
  const cart = getProductCart();
  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("producto añadido al carrito");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya lo tienes en el carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido al correctamente");
    }
  }
}

//funcion para contar los productos del carrito
export function countProductsCart() {
  const cart = getProductCart();
  //condicional si cart no tiene contenido devuelve cero sino el valor
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

//función para eliminar productos del carrito
export function removeProductCart(product) {
  const cart = getProductCart();
  //obtener el producto que esta llegando
  remove(cart, (item) => {
    return item === product;
  });

  //se envia los productos menos el que se optuvo en lo anterior
  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
}
