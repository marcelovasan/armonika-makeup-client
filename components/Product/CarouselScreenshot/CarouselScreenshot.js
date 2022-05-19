import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";
import { BASE_PATH } from "../../../utils/constans";

const settings = {
  className: "carousel-screenshots",
  dots: false, //Elimina los puntitos
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipeToSlider: true,
};

export default function CarouselScreenshot(props) {
  const { title, screenshots } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };
  // console.log(screenshots);

  return (
    <>
      <Slider {...settings}>
        {map(screenshots, (screenshot) => (
          <Image
            key={screenshot.id}
            src={BASE_PATH + screenshot.url}
            alt={screenshot.name}
            onClick={() => openImage(BASE_PATH + screenshot.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
