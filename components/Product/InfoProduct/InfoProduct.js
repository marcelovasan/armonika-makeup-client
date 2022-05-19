import React from "react";
import ReactPlayer from "react-player/lazy"; //carga mas lenta del video
import moment from "moment";
import "moment/locale/es";
import CarouselScreenshot from "../CarouselScreenshot/CarouselScreenshot";

export default function InfoProduct(props) {
  const { product } = props;
  // console.log(product);

  return (
    <div className="info-product">
      <ReactPlayer
        className="info-product__video"
        url={product.video}
        controls={true}
      />
      <CarouselScreenshot
        title={product.title}
        screenshots={product.screenshots}
      />
      <div className="info-product__content">
        <div
          className="header-product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="info-product__content-date">
          <h4>Fecha Lanzamiento:</h4>
          <p>{moment(product.relaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
