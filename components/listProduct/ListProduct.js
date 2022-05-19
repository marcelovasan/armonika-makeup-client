import React from "react";
import { map } from "lodash";
import { Grid, Image } from "semantic-ui-react";
import Link from "next/link";
import { BASE_PATH } from "../../utils/constans";
import useWindowSize from "../../hooks/UseWindowSize"; //medidas de pantallas
import {
  breakpointUpLg,
  breakpointUpSm,
  breakpointUpMd,
} from "../../utils/breakpoint"; //para usar las medidas

//funcion pra listar los productos
export default function ListProduct(props) {
  const { products } = props;
  const { width } = useWindowSize();
  //   console.log(width);
  //console.log(products);
  //funcion para la funcion de la conlumana
  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 4;
      case width > breakpointUpSm:
        return 3;
      default:
        return 2;
    }
  };
  return (
    <div className="list-products">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(products, (product, index) => (
            <Product key={index} product={product} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

//funcion que lista lo abtraeer la información de donde se envie
function Product(props) {
  const { product } = props;
  //console.log(product);

  return (
    <Grid.Column className="list-products__product">
      <Link href={`/${product.url}`}>
        <a>
          <div className="list-products__product_poster">
            <Image src={BASE_PATH + product.poster.url} alt={product.title} />
            <div className="list-products__product_poster_info">
              {product.discount ? (
                <span className="discount">-{product.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">S/. {product.price}</span>
            </div>
          </div>
          <h2>{product.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
