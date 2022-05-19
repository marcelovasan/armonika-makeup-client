import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout"; //contenerdor principal de la pagina
import { getLastProductApi } from "../api/product"; //funcion para listar los productos mas recientes
import ListProduct from "../components/listProduct/ListProduct";

export default function Home() {
  const [products, setProducts] = useState(null);
  //console.log(products);
  useEffect(() => {
    (async () => {
      const response = await getLastProductApi(20); //lista los productos sin importar la clase
      if (size(response) > 0) setProducts(response);
      else setProducts([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {!products && <Loader active>Cargando Productos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No hay Productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProduct products={products} />}
    </BasicLayout>
  );
}
