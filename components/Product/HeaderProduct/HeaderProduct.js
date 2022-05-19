import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";
import { size } from "lodash";
import { BASE_PATH } from "../../../utils/constans"; //para concatenar la url
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../api/favorite";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart"; //Para el boton del carrito
import classNames from "classnames";

export default function HeaderProduct(props) {
  const { product } = props;
  const { poster, title } = product;
  // console.log(product);
  return (
    <Grid className="header-product">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        {/*como concatenar la url */}
        <Image src={BASE_PATH + poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info product={product} />
      </Grid.Column>
    </Grid>
  );
}
//funcion para optenr los datos de precios
function Info(props) {
  const { product } = props;
  const { title, summary, price, discount, url } = product;

  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();
  // console.log(isFavorite);

  //efecto para saber si esta en favoritos
  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, product.id, logout);
      //condicion para saber si es favorito o no
      // console.log(response);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
    setReloadFavorite(false);
  }, [product, reloadFavorite]); //Se ejecuta cuando cambia de estado

  const addFavorite = async () => {
    //condicion para ver si el usuario esta logueado
    if (auth) {
      // console.log("Id de usuario ", auth, "Id del producto", product.id);
      await addFavoriteApi(auth.idUser, product.id, logout);
      setReloadFavorite(true); //para recargar el producto
    }
  };
  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, product.id, logout);
      setReloadFavorite(true);
    }
  };

  // redondeando modo google //Descuento de precio para el producto
  // var precie_dicount = price - Math.floor(price * discount) / 100.0;
  // precie_dicount = precie_dicount.toFixed(2); //redondea a 2 decimales precición 80%

  return (
    <>
      <div className="header-product__title">
        {title}
        {/*clase like da color al coranzon */}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({ like: isFavorite })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      {/*dangeroustySetInnerHTML es para el uso de hrml el cajon y no lo muestre como un html y no como texto*/}
      <div className="header-product__delivery">Entrega en 24/72h</div>
      <div
        className="header-product__sumary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-product__buy">
        <div className="header-product__buy-price">
          <p>Precio de venta S/. {price}</p>
          <div className="header-product__buy-price-actions">
            {discount > 0 ? <p>-{discount}% </p> : <p> </p>}
            <p>
              S/. {(price - Math.floor(price * discount) / 100.0).toFixed(2)}
            </p>
          </div>
        </div>
        <Button
          className="header-product__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Añadir al carrito
        </Button>
      </div>
    </>
  );
}
