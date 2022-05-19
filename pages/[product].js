import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getProductByUrlApi } from "../api/product";
import HeaderProduct from "../components/Product/HeaderProduct";
import TabsProduct from "../components/Product/TabsProduct/TabsProduct";
import { Loader } from "semantic-ui-react";

export default function Product() {
  const [product, setProduct] = useState(null);
  const { query } = useRouter();
  // console.log(query);
  useEffect(() => {
    (async () => {
      const response = await getProductByUrlApi(query.product);
      // console.log(response);
      setProduct(response);
    })();
  }, [query]);
  //Validacion para que la consulta no sea undefined y no genere error al cargar
  if (!product) return <Loader>Cargando producto</Loader>;

  return (
    <BasicLayout className="product">
      <HeaderProduct product={product} />
      <TabsProduct product={product} />
    </BasicLayout>
  );
}
