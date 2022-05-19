import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getProductByUrlApi } from "../api/product"; //url del product
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart/SummaryCart";

export default function cart() {
  const { getProductCart } = useCart();
  const products = getProductCart();

  //condición para los productos
  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

//función del carrito vacio
function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>NO hay productos en el carrito agrega uno</h2>
    </BasicLayout>
  );
}

//funcion del carrito lleno
function FullCart(props) {
  const { products } = props;
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  //   console.log(products);//para ver los productos del carrito
  // console.log(productsData);//para ver la data del producto

  //URL opteien para la lista de productos
  useEffect(() => {
    (async () => {
      const productsTemp = [];
      //for asincrono no sobre carga la data
      for await (const product of products) {
        const data = await getProductByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart
        products={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
    </BasicLayout>
  );
}
