import React from 'react';
import { Container, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = (brands) =>{
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };

return (
    <Slider {...settings}>
    {brands.map(function(brand) {
      return (
        <>
          <Link to={`/brand/${brand.id}`}>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={logo}
                />
                <Card.Body>
                  <span>{brand.brandName}</span>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        </>
      );
    })}
  </Slider>
);
}

export default Carousel;