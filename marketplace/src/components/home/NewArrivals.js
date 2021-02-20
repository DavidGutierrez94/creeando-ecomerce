import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import ItemsCarousel from 'react-items-carousel';


const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [mov, setMov] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    
      if (window.innerWidth < 350) {
        setMov(1)
      }else{
        setMov(3)
      }
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div style={{padding:30}} className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          
          <ItemsCarousel
       infiniteLoop={false}
       gutter={12}
       activePosition={'center'}
       chevronWidth={60}
       disableSwipe={false}
       alwaysShowChevrons={false}
       numberOfCards={mov}
       slidesToScroll={mov}
       outsideChevron={true}
       showSlither={false}
       firstAndLastGutter={false}
       activeItemIndex={activeItemIndex}
       requestToChangeActive={value => setActiveItemIndex(value)}
       rightChevron={'>'}
       leftChevron={'<'}
    >
            {products.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </ItemsCarousel>
        )}
      </div>
    </>
  );
};

export default NewArrivals;
