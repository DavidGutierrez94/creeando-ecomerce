import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import Biglogo from "../images/biglogo.png"

const Landing = () => {
    const size = { height: '500px' };
    const upper = { margin:' -40px  10px 0px 0px' };
    return (
        <container className="p-5 text-center">
            <Row type="flex" justify="center" align="middle">

                <Col lg={24} md={24} sm={24} xs={24}>
                    <img src={Biglogo} style={size} alt="Creeando"/>
                    <h1 className="align-center" style={upper}>Bienvenid@ al Marketplace de Creeando</h1>
                    <Link to="/">
                        <Button type="primary" primary >
                            ir a la web
                        </Button>
                    </Link>

                    <Button type="primary" danger>
                        mundo virtual
                    </Button>

                </Col>
            </Row>
        </container>

    );

    

}





export default Landing;