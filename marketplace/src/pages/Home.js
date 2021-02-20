import React, { useEffect, useState } from "react";
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
import { getBrands } from "../functions/brands";
import ItemsCarousel from 'react-items-carousel';


const Home = () => {
  const cardEdges = {
    width: 240,
    borderRadius: 25,
  };
  const { Meta } = Card;
  const color = { background: '' }

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [mov, setMov] = useState(false);
  const [brands, setBrands] = useState([]);
  


  useEffect(()=>{
    
    if (window.innerWidth < 350) {
      setMov(1)
    }else{
      setMov(5)
    }
    getBrands(0,0,0).then((res)=>setBrands(res.data))
  },[])
  return (
    <>
      <div className="jumbotron text-primary h1 font-weight-bold text-center" style={{ background: "#E0FBFC" }}>
        <Jumbotron text={["Bienvenid@ a una experiencia única", "Escoge", " Compra ", " Disfruta "]} style={{ background: "#E0FBFC" }}/>
      </div>
      <div style={{ background: "#74008844" }} className="p-0">
        <h4 className="text-center display-4 jumbotron " style={{ background: "#740088", color: "white", fontFamily: "OpenSans", fontWeight: "bold" }}>
          🌟 Marcas
      </h4>
</div>
       <div>
            <ItemsCarousel
         infiniteLoop={false}
         gutter={12}
         activePosition={'center'}
         chevronWidth={60}
         disableSwipe={false}
         alwaysShowChevrons={false}
         numberOfCards={mov}
         slidesToScroll={2}
         outsideChevron={true}
         showSlither={false}
         firstAndLastGutter={false}
         activeItemIndex={activeItemIndex}
         requestToChangeActive={value => setActiveItemIndex(value)}
         rightChevron={'>'}
         leftChevron={'<'}
      >
              {brands.map((brand) => (
                <div style={{margin:20}}>
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
               
                  </div>
              ))
              }
              </ItemsCarousel>
            
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
