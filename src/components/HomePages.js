import React, { useEffect, useState } from 'react'
import Caro from "./Caro"
import { Row, Col, Card } from 'reactstrap';
//import { Link } from 'react-router-dom'
import Footer from './Footer'
// import axios from 'axios';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import Navbar from './Navbar';
import FooterComponent from './FooterComponent';
// import { message } from 'antd';
import { Axios } from './commonApi/commonApi';


const HomePages = () => {
    const history = useHistory();
    const [loading, setloading] = useState(true);
    const [date, setdata] = useState([]);
    
    const url = `/getProduct`
    const get = async () => {
        const res = await Axios.get(url);
        
        setdata(res.data.message)
        setloading(false);
    }
    const category = (product) => {
    
        // console.log(product.children[0].children[0].name)
        //console.log(product.children[0].name);
        // history.push(`/cat/${product.children[0].children[0].name}`)
        history.push(`/cat/${product?.name}`)
    }
   
    useEffect(() => {
        get()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Navbar />
            <Caro />
            <div className='container mt-3'>
                {loading ? <LoadingSpinner /> : <Row>
                    {
                        date.map((product, key) => {
                            //destructuring the products 
                            return (
                                <Col sm="3" key={key} className="py-3 ">
                                    <Card body className='category' onClick={(e) => category(product)} >
                                        <img src={product.image} alt="..." height='200px' />
                                        <h5 className='text-center'>{product.name}</h5>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>}

            </div>
            <FooterComponent />
            <Footer />
        </>
    )
}

export default HomePages
