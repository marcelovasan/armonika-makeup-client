import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchProductApi } from "../api/product";
import ListProduct from "../components/listProduct";

export default function search() {
  const [products, setproducts] = useState(null);
  const { query } = useRouter();

  //   console.log(query);//para ver si la query esta funcionando

  useEffect(() => {
    //javascritp es esta codigo
    document.getElementById("search-product").focus(); //matine el foco de la letra
  }, []);

  //se ejecuta cada vez que la query sufra un cambio
  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchProductApi(query.query);
        // console.log(response); //para ver si la busqueda funciona
        if (size(response) > 0) setproducts(response);
        else setproducts([]);
      } else {
        setproducts([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      {!products && <Loader active>Buscando Productos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No se ha encontrado juegos con ese nombre</h3>
        </div>
      )}
      {size(products) > 0 && <ListProduct products={products} />}
    </BasicLayout>
  );
}
