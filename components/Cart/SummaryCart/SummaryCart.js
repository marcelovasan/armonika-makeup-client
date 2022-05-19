import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";
import { BASE_PATH } from "../../../utils/constans";

export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductCart } = useCart();

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price +=
        product.price - Math.floor(product.price * product.discount) / 100;
    });
    setTotalPrice(price);
  }, [reloadCart, products]);

  //Enviar datos para eliminar el carrito
  const removeProduct = (product) => {
    removeProductCart(product);
    // console.log(product);
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio con Descuento</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image
                    src={BASE_PATH + product.poster.url}
                    alt={product.title}
                  />
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.class.title}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>
                  S/.{" "}
                  {(
                    product.price -
                    Math.floor(product.price * product.discount) / 100
                  ).toFixed(2)}
                </Table.Cell>
              </Table.Row>
            ))}
            <Table.Row className="summary-cart__resumen">
              <Table.Cell className="clear" />
              <Table.Cell colSpan="2">Total: </Table.Cell>
              <Table.Cell className="total-price">
                S/. {totalPrice.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
