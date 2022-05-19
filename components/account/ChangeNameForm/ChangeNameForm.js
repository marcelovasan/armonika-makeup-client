import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"; //importacion del formik para poder editar los datos dle usuario
import * as Yup from "yup"; //para validar los datos ingresados del usurio
import { toast } from "react-toastify"; //Manejo de notificacion del usuario
import { updateNameApi } from "../../../api/user";

export default function ChangeNameForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    //(funcion) ({funcion que recive un objeto})
    initialValues: initialValues(user.name, user.lastname),
    // para validar los valores
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      // console.log(formData);
      // cambio el valor de mi estado a true
      setLoading(true);
      const response = await updateNameApi(user.id, formData, logout); //enviamos el id para que pueda modificar el dato
      // console.log(response);
      // si response es null
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar su nombre o apellido");
      } else {
        setReloadUser(true);
        toast.success("Nombre y Apellidos actualizados");
        formik.handleReset();
      }
      // cambio el valor de mi estado a true
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Cambiar tu nombre y apellidos</h4>
      <Form onSubmit={formik.handleSubmit}>
        {/*para que tengas tamaños iguales los inputs */}
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Ingresa tu nuevo nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Ingresa tus nuevos apellidos"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues(name, lastname) {
  return {
    name: name || "", //si llega name sino queda vacio
    lastname: lastname || "", //si llega el apellido sino queda vacio
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}
