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
import { Carousel, Card, Col, Row,Avatar } from "antd";

const Home = () => {
  const { Meta } = Card;
  const color = { background: '#dcdcdc' }
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
      <div className="jumbotron text-primary h1 font-weight-bold text-center">
        <Jumbotron text={["Bienvenid@ a una experiencia única","Escoge", " Compra ", " Disfruta "]} />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
         🌟 Marcas  
      </h4>
      <Carousel>

        <div className="p-0">
          <Row justify="space-around">
            {brands.map((brand) => (
                <Col span={4}>
                  <Card 
                    bordered={false}
                    hoverable
                    style={{ width: 240 }}
                    alt="example"
                    cover={<img alt="example" src={brand.logo} />}
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


      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        🚀 Nuevas Entradas
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        🔥 Lo Más Top
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categorías
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categorías
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
