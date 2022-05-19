import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../../components/Header";
import classNames from "classnames";

export default function BasicLayout(props) {
  const { children, className } = props; //recive los datos del index
  // className = "basic-layout";
  //classnames es para las clases del los componentes para administrar las condicionales de los diseños
  return (
    <Container
      fluid
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
}
