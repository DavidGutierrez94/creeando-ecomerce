import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import ItemsCarousel from 'react-items-carousel';


const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [mov, setMov] = useState(false);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
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
          numberOfCards={3}
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

export default BestSellers;
