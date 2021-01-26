import React, { useEffect, useState } from "react";
import { getBrands, getBrandsCount } from "../../functions/brands";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const TopBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [BrandsCount, setBrandsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllBrands();
    }, [page]);

    useEffect(() => {
        getBrandsCount().then((res) => setBrandsCount(res.data));
    }, []);

    const loadAllBrands = () => {
        setLoading(true);
        // sort, order, limit
        getBrands("createdAt", "desc", page).then((res) => {
            setBrands(res.data);
            setLoading(false);
        });
    };

    return (
        <>
            <div className="container">
                {loading ? (
                    <LoadingCard count={3} />
                ) : (
                        brands.map((brand) => (
                            <Col span={4}>
                                <Card
                                    bordered={false}
                                    hoverable
                                    style={{ width: 240, borderRadius:25 }}

                                    alt="example"
                                    cover={<img style={{borderRadius:25}} alt="example" src={brand.logo} />}
                                >
                                    <Meta
                                        avatar={<Avatar src={brand.logo} />}
                                        title={brand.name}

                                    />
                                </Card>
                            </Col>

                        ))
                    )}
            </div>

            <div className="row">
                <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                    <Pagination
                        current={page}
                        total={(productsCount / 3) * 10}
                        onChange={(value) => setPage(value)}
                    />
                </nav>
            </div>
        </>
    );
};

export default TopBrands;
