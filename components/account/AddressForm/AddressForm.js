import React, { useState } from "react"; // hook es useState
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"; //validar los datos ingresados por el input
import * as Yup from "yup"; //validacion del formik
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../api/address"; //importacion para crear la direccion
import { toast } from "react-toastify";
//props recupera lo enviado por parte del account
export default function AddressForm(props) {
  const { setShowModal, setReloadAddresses, newAddress, address } = props; //Estados para manejar los estado necesarios
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth(); //uso de use auth
  //constante de formik para la validacion de datos
  const formik = useFormik({
    initialValues: initialValues(address), //envia los valores que tiene address que es de los props
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });
  //funcion para crear una nueva dirreción
  const createAddress = async (formData) => {
    setLoading(true); //formdata temporal para poder modificar la contante
    const formDataTemp = {
      ...formData,
      user: auth.idUser, //lo cambie por users_permissions_user ya que con user no funciona
    };
    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.warning("Error al crear la dirreción");
      setLoading(false);
    } else {
      formik.resetForm();
      setLoading(false);
      setShowModal(false);
      setReloadAddresses(true);
    }
  };
  //funcion para actualizar las direcciones del usurio
  const updateAddress = (formData) => {
    //log de consolas
    // console.log("Actualizando dirección");
    // console.log(formData);
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = updateAddressApi(address._id, formData, logout);
    //si responde es false sino es tru
    if (!response) {
      toast.warning("Error al actualizar la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
      toast.success("Dirrecion de envio actualizada");
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Titulo de la Dirreción"
        placeholder="Titulo de la dirección"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellidos"
          placeholder="Ingrese nombre y apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="edentity"
          type="text"
          label="Numero de identificación (Obligatorio)"
          placeholder="Ingresa tu DNI O Carnet de extranjeria"
          onChange={formik.handleChange}
          value={formik.values.edentity}
          error={formik.errors.edentity}
        />
        {/*numero de identifidacion */}
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="address"
          type="text"
          label="Dirección"
          placeholder="Ingresa tu dirección completa"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
        <Form.Input
          name="city"
          type="text"
          label="ciudad"
          placeholder="ciuadad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="state"
          type="text"
          label="Provincia/Region"
          placeholder="Provincia/Region"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
        {/*state representa el estado o la provincia */}
        <Form.Input
          name="postalCode"
          type="text"
          label="Codigo Postal"
          placeholder="Ingresa tu codigo postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="phone"
          input="text"
          label="Numero de Celular (Obligatorio)"
          placeholder="Ingresa tu numero de celular"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
        <Form.Input
          name="reference"
          input="text"
          label="Referencia de su direccion(opcional)"
          placeholder="Ingresa una referencia de tu dirección"
          onChange={formik.handleChange}
          value={formik.values.reference}
          error={formik.errors.reference}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear Dirección" : "Actualizar Dirección"}
          {/*si newAddress existe crea sino elimina */}
        </Button>
      </div>
    </Form>
  );
}
//funcion para iniciar valores
function initialValues(address) {
  //si address tiene valor devuelve el valor el valor queda vacion
  return {
    title: address?.title || "",
    name: address?.name || "",
    edentity: address?.edentity || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
    reference: address?.reference || "",
  };
}
//funcion para validar valores ingresado
function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    edentity: Yup.number().required(
      "Ingrese solo numeros de su DNI o Carnet de edentidad"
    ),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(
      "Ingrese su codigo postal de su ubicacion"
    ),
    phone: Yup.string()
      .required(true)
      .min(9, "Ingrese los 9 numeros de su celular "),
    reference: Yup.string(),
  };
}
