import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import BrandOne from "../images/brandOne.jpg";
import BrandTwo from "../images/brandTwo.jpg";
import BrandThree from "../images/brandThree.jpg";
import BrandFour from "../images/brandFour.jpg";
import BrandFive from "../images/brandFive.jpg";
import { Carousel, Card, Col, Row, Avatar } from "antd";

const Home = () => {
  const cardEdges = {
    width: 240,
    borderRadius: 25,
  };
  const { Meta } = Card;
  const color = { background: '' }
  const brands = [
    {
      name: "Dribble",
      logo: BrandOne
    },
    {
      name: "Nike",
      logo: BrandTwo
    },
    {
      name: "Typos",
      logo: BrandThree
    },
    {
      name: "Lava",
      logo: BrandFour
    },
    {
      name: "Supreme",
      logo: BrandFive
    }
  ];
  return (
    <>
      <div className="jumbotron text-primary h1 font-weight-bold text-center" style={{ background: "#E0FBFC" }}>
        <Jumbotron text={["Bienvenid@ a una experiencia única", "Escoge", " Compra ", " Disfruta "]} style={{ background: "#E0FBFC" }}/>
      </div>
      <div style={{ background: "#74008844" }} className="p-0">
        <h4 className="text-center display-4 jumbotron " style={{ background: "#740088", color: "white", fontFamily: "OpenSans", fontWeight: "bold" }}>
          🌟 Marcas
      </h4>

        <Carousel >

          <div className="p-3">
            <Row justify="space-around">
              {brands.map((brand) => (
                <Col span={4}>
                  <Card

                    bordered={false}
                    hoverable
                    style={cardEdges}
                    alt="example"
                    cover={<img alt="example" src={brand.logo} style={{ height: "250px", objectFit: "cover", borderRadius: "25px 25px 0px 0px" }} />}
                  >
                    <Meta
                      avatar={<Avatar src={brand.logo} />}
                      title={brand.name}

                    />
                  </Card>
                </Col>

              ))
              }
            </Row>

            <br></br>
          </div>
        </Carousel>
      </div>
      <div style={{ background: "#72EFDD44" }} className="p-0">
        <h4 className="text-center display-4 jumbotron" style={{ background: "#72EFDD", color: "white", fontFamily: "OpenSans", fontWeight: "bold" }}>
          🚀 Nuevas Entradas
        </h4>
        <NewArrivals />
      </div>
      <div style={{ background: "#56CFE144" }} className="p-0">
      <h4 className="text-center display-4 jumbotron" style={{ background: "#56CFE1", color: "white", fontFamily: "OpenSans", fontWeight: "bold" }}>
        🔥 Lo Más Top
      </h4>
      <BestSellers />
      </div>
      <div style={{ background: "#FF499E44" }} className="p-0">
      <h4 className="text-center display-4 jumbotron" style={{ background: "#FF499E", color: "white", fontFamily: "OpenSans", fontWeight: "bold" }}>
        Categorías
      </h4>
      <CategoryList />
      </div>
      <div style={{ background: "#70DDCA44" }} className="p-0">

      <h4 className="text-center display-4 jumbotron" style={{ background: "#70DDCA", color: "white", fontFamily: "OpenSans", fontWeight: "bold" }}>
        Sub Categorías
      </h4>
      <SubList />
      </div>

      <br />
      <br />
    </>
  );
};

export default Home;
