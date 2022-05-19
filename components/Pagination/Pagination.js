import React from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

//para la paginacion del juego
export default function Pagination(props) {
  const { totalProduct, page, limitPerPage } = props;
  const totalPages = Math.ceil(totalProduct / limitPerPage); //math.ceil redondea a la alza
  const router = useRouter();
  //   console.log(router); //para saber el numero de pagina
  const urlParse = queryString.parseUrl(router.asPath);
  //   console.log(urlParse);
  //para ver el numero de paginas dle url
  const goToPage = (newPage) => {
    // console.log(newPage);
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    // console.log(url);
    router.push(url);
  };
  //función para la lista de paginasen la pantalla
  return (
    //para la paginacion el diseño
    <div className="pagination">
      <PaginationSU
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1 /*inicia en la pagina 1 */}
        ellipsisItem={null}
      />
    </div>
  );
}
