import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import { map } from "lodash"; //impotacion del map de javascrit
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth"; //para poder usarlo en el logout
import useCart from "../../../hooks/useCart"; //Para el numero del carrito
import { getMeApi } from "../../../api/user";
import { getClassesApi } from "../../../api/class"; //para optener las classes o las categorias de los productos

export default function MenuWeb(props) {
  const [classes, setClasses] = useState([]); //estado de las classes inicia vacias como si no hubiera plataformas
  const [showModal, setShowModal] = useState(false);
  const [TitleModal, setTitleModal] = useState("Iniciar sessión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth(); //object destructuring astrae los datos del array
  //funcion que maneja el estado del asuario
  useEffect(() => {
    //*async() =>{ -->No se usa de esa manera ya que daria error
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]); // Se ejecuta automaticamente cuando se cambio el usuario
  //funcion del estado que maneja el estado de las classes o categorias
  useEffect(() => {
    (async () => {
      const responde = await getClassesApi();
      setClasses(responde || []); //devuelde response si lllega sino un array vacio
      // console.log(responde); //verificando si esta accediendo a las classes
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid mobile={16} tablet={8} computer={4}>
          <Grid.Column className="menu__left" width={8}>
            <MenuClasses classes={classes} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={8}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      {/*Muestra la ventana emergente en la pantalla*/}
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={TitleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}
//funcion de lista las classes o las categorias de los productos
function MenuClasses(props) {
  const { classes } = props;
  return (
    <Menu>
      {map(classes, (classes) => (
        <Link href={`/product/${classes.url}`} key={classes._id}>
          <Menu.Item as="a" name={classes.url}>
            {classes.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}
//funcion par el menu de las opciones del usuario
function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  const { productsCart } = useCart();

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            {/*para el boton de ordenes*/}
            <Menu.Item as="a">
              <Icon name="shopping basket" />
              Mis Pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            {/*Lista de deseos*/}
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Deseos
            </Menu.Item>
          </Link>
          <Link href="/account">
            {/*Configuracion del usuario*/}
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart" className="m-0">
            <Menu.Item as="a">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item className="m-0" onClick={logout}>
            <Icon name="user x" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
