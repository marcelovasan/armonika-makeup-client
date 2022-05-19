import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { registerApi } from "../../../api/user";

//registro del usuario
export default function RegisterForm(props) {
  const { showLoginForm } = props; //prop recive los datos del login
  const [loading, setLoading] = useState(false); //estado de cargando en el boton de registrar
  const formik = useFormik({
    //funsion que recive los datos del formulario
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    //cuando esta registrando se sincroniza
    onSubmit: async (formData) => {
      setLoading(true); //se activa el cargando al entrar a esa sessión
      const response = await registerApi(formData); //avisa cuando termina y se guarde en una constante
      if (response?.jwt) {
        showLoginForm();
      } else {
        toast.error("Error al registrar el usuario, intentolo mas tarde");
      }
      setLoading(false);
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Ingrese su nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Ingrese su Apellidos"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Ingrese su nombre de usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Ingrese Correo Electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Ingrese Contraseña"
        required
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showLoginForm}>
          Iniciar Sesión
        </Button>
        <Button type="submit" className="submit" secondary loading={loading}>
          Registrar Nuevo Usuario
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}
function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
