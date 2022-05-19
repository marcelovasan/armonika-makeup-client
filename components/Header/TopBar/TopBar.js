import React, { useState, useEffect } from "react";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link"; //Ridirige un item a cualquier objeto o item
import { BASE_PATH } from "../../../utils/constans";
import { useRouter } from "next/router";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  //para podr usar la ruta local de strapi
  const img = `${BASE_PATH}/uploads/01_04_d9b07e7689.png`; //constante para el logo del producto

  return (
    <Link href="/">
      <a>
        <Image src={img} alt="Product" />
      </a>
    </Link>
  );
}
//funcion para poder buscar
function Search() {
  //Almacena el valor de los datos que el usuario ingresa
  const [load, setLoad] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const router = useRouter();

  // console.log(router);//Muestra el valor de del texto que se escribe en la query
  // console.log(searchStr); //si lo dejas te muestra una alvertencia

  //se ejecuta indifinidas veces que no se puede utilizar la red
  useEffect(() => {
    //si load es tru se ejecuta y se soluciona el bucle
    if (load) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <Input
      id="search-product"
      type="text"
      icon={{ name: "search" }}
      placeholder="Buscar Producto"
      onChange={(_, data) => {
        setSearchStr(data.value);
      }}
      value={router.query.query}
    />
  );
}
