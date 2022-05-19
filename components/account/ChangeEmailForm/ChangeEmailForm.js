import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props; //object destrutere para optener los datos enviados por los props
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar el e-mail o ya existe ese e-mail");
      } else {
        setReloadUser(true);
        toast.success("Email actualizado");
        formik.handleReset();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambia tu email de usuario
        <span> (Tu e-mail actual es: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        {/*pára que los imputs tengas tamaños iguales*/}
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Ingresa tu nuevo e-mail"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          {/*colocar submit a type si o si para que no aparesca warning*/}
          Actualizar
        </Button>
      </Form>
    </div>
  );
}
function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], true),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], true),
  };
}
