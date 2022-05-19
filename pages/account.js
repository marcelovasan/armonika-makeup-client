import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router"; //maneja rutas de las pagina
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth"; //maneja los estados de los usuarios
import { getMeApi } from "../api/user"; //maneja el estado del usuario
import ChangeNameForm from "../components/account/ChangeNameForm"; //importacion para el formulario de cambio de datos del formulario
import ChangeEmailForm from "../components/account/ChangeEmailForm"; //Para oder importar el formulario
import ChangePasswordForm from "../components/account/ChangePasswordForm/ChangePasswordForm"; //importación para el cambio de contraseña
import BasicModal from "../components/Modal/BasicModal"; //importacion del modal para poder reutilizarlo despues
import AddressForm from "../components/account/AddressForm"; //importacion para el formulario de creacion de usuario
import ListAddress from "../components/account/ListAddress/ListAddress"; //imporacion de lista las direcciones del usuario

export default function account() {
  const { auth, logout, setReloadUser, openModal } = useAuth(); //abtrae la propiedades del auth
  const [user, setUser] = useState(undefined); //maneja los datos del usuario
  const router = useRouter(); //para poder manejar las rutas de manera dinamica

  useEffect(() => {
    //optrnrt los datos del usario y comprobar si existen
    (async () => {
      const response = await getMeApi(logout); //para verificar si el usuario existe
      setUser(response || null); //si response existe devuelve el valor sino es nulo
    })();
  }, [auth]); //se ejecuta cuando cambia de valor

  if (user === undefined) return null; //si el usuario es undefined es porque no a comprobado
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuracion
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
        openModal={openModal}
      />
      {/*envia la informacion por los props a configuration */}
      <Address />
    </BasicLayout>
  );
}

function Configuracion(props) {
  //optiene los datos del usuario que se envia en el layout
  const { user, logout, setReloadUser } = props; //para abtraer los datos y enviar a formulario

  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
}

function Address() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false); //Estado para cuano se agregue un nuevo usuario se agregue automaticamente

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true} //si address tiene contenido va ser false porque tiene informacion
        address={address || null} //si tiene se envia los datos sino no se envia nada o nulo
      />
    ); //se ejecuta cuando demos abrir para agregar nueva direción
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={() => openModal("Nueva dirección")} />
      </div>
      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          openModal={openModal} //pasando por props para editar la direccion reutilizando
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {/*envia los props para poder ejecutarse en la funcion */}
        {formModal}
      </BasicModal>
    </div>
  );
}
