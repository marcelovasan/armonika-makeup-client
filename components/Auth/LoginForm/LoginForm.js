import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const { auth, login } = useAuth();

  const formik = useFormik({
    initialValues: initialValuaes(),
    validationSchema: Yup.object(validacionShema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("El email o contraseña son incorrectas");
      }
      setLoading(false);
    },
  });
  const resetPassword = () => {
    //funcion para cuando olvides la contraseña  par el reset
    formik.setErrors({});
    const validateEmail = Yup.string().email().required(); //email para la validacion del email ademas es requerido
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      //si es difecte de un email sale error o incorrecto
      formik.setErrors({ identifier: true }); //setea errores en la caja de texto
    } else {
      // si el email es valido pasara a enviar el email
      resetPasswordApi(formik.values.identifier); //envia el email al usuario
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Ingrese su Correo Electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Ingrese su contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button.Group vertical>
          <Button className="submit" type="submit" loading={loading}>
            Ingresar
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
          <Button type="button" onClick={showRegisterForm}>
            Registrarse
          </Button>
        </Button.Group>
      </div>
    </Form>
  );
}

function initialValuaes() {
  //inicia la validacion del formulario para verificar que los datos han sido ingresados correctamente
  return {
    identifier: "",
    password: "",
  };
}
function validacionShema() {
  //validacion de valores con el yup para el requistar
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
