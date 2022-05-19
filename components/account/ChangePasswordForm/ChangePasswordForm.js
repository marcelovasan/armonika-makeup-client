import React, { useDebugValue, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePasswordApi } from "../../../api/user";
import { toast } from "react-toastify";

export default function ChangePasswordForm(props) {
  const { user, logout } = props; //para optener lo enviado la carpeta de account
  const [loading, setLoading] = useState(false); //loading para el boton de cargar al momento de actualizar

  //validacion de la informacion ingresada
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = updatePasswordApi(user.id, formData.password, logout);
      if (!response) {
        toast.error("Error al actualizar la contraseña");
      } else {
        toast.success("contraseña cambiada conrrectamente");
        logout();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-password-form">
      <h4>Cambiar tus contraseñas</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Ingrese su nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Verificar nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}
function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], true), //oneof para validar las contraseñas del usuario que ingrese que sea igual
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true), //oneof para validar que lo ingresado por password es igual a la anterior
  };
}
