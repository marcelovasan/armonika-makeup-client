import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth"; //para obtener el id del usario
import ListProduct from "../components/listProduct";
import useCart from "../hooks/useCart";

export default function wishlist() {
  const [products, setProducts] = useState(null);
  const { auth, logout } = useAuth();

  console.log(useCart());
  // console.log(products);

  //para poder listar de manera correcto todo los servicios
  useEffect(() => {
    (async () => {
      const responde = await getFavoriteApi(auth.idUser, logout);
      // console.log(responde);
      // setProducts(responde);
      if (size(responde) > 0) {
        const productsList = [];
        //bucle for de lodash
        //por cada interacción me devuelve el valor
        forEach(responde, (data) => {
          productsList.push(data.product);
        });
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {/*Condiciones para la carga de los productos  para mostrar el boton*/}
          {!products && <Loader active>Cargando lista de favoritos</Loader>}
          {/*condicion parar validar los contenidos si es cero pasa eso */}
          {products && size(products) === 0 && (
            <div className="data__not-found">
              <h3>No tienes ningun producto en tu lista de deseos</h3>
            </div>
          )}
          {/*si hay productos para envia por props los datos sino en automatico a la pagina uno*/}
          {size(products) > 0 && <ListProduct products={products} />}
        </div>
      </div>
    </BasicLayout>
  );
}
