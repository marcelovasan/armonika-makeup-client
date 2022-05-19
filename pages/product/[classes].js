import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; //para manejar las rutas con react
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../../layouts/BasicLayout"; //para renderizar lo qur llegue del producto
import {
  getProductsClassApi,
  getTotalProductsClassApi,
} from "../../api/product";
import ListProduct from "../../components/listProduct/ListProduct";
import Pagination from "../../components/Pagination/Pagination";

//limite de carga de productos
const limitPerPage = 20;

export default function Product() {
  const { query } = useRouter(); //consultar las rutas ya esta listo
  // console.log(query); //consulta para las rutas
  const [products, setProducts] = useState(null);
  const [totalProduct, settotalProduct] = useState(null);
  //función para validar el numero de productos para ser validados.
  // console.log(query);
  const getStartItem = () => {
    const currentPages = parseInt(query.page); //
    if (!query.page || currentPages === 1) return 0;
    else return currentPages * limitPerPage - limitPerPage; //calcula los items sobrantes y paginar
  };

  //funcion para buscar la categoria del juego dinamica
  useEffect(() => {
    (async () => {
      //Para mejor aspecto al cargar primero es vacio el query despues carga y la condicion no salga error
      if (query.classes) {
        const response = await getProductsClassApi(
          query.classes,
          limitPerPage,
          getStartItem()
        );
        // console.log(response);
        setProducts(response);
      }
    })();
  }, [query]);
  //contar la cantidad de productos para la paginación del juego
  useEffect(() => {
    (async () => {
      const response = await getTotalProductsClassApi(query.classes);
      settotalProduct(response);
      // console.log(response);//para ver la cantidad de productos
    })();
  }, [query]);

  return (
    <BasicLayout className="classes">
      {/*Condiciones para la carga de los productos  para mostrar el boton*/}
      {!products && <Loader active>Cargando categorias</Loader>}
      {/*condicion parar validar los contenidos si es cero pasa eso */}
      {products && size(products) === 0 && (
        <div>
          <h3>No se ha encontrado productos</h3>
        </div>
      )}
      {/*si hay productos para envia por props los datos sino en automatico a la pagina uno*/}
      {size(products) > 0 && <ListProduct products={products} />}
      {totalProduct ? (
        <Pagination
          totalProduct={totalProduct}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
