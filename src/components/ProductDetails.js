import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import Select from 'react-select'
//import { Stepper, Step } from 'react-form-stepper';
import { Col, Row } from 'reactstrap'
import LoadingSpinners from './LoadingSpinner';
import Navbar from './Navbar';
import { Axios } from './commonApi/commonApi';


const ProductDetails = () => {
    const { _id } = useParams();
    const [sel, setselect] = useState()
    const [address, setaddress] = useState([])
    const [items, setitem] = useState([])
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([])



    const loaduser = async () => {
        setloading(true)
        try {
            const res = await Axios.get(`/product/${_id}`)
            if(res){
                setaddress(res.data.item.shippingAddress)
                setitem(res.data.item)
                setdata(res.data.item.cartItems)
                setloading(false)
            }

       
        } catch (error) {
            setloading(false)
        }
        
       
    }
    async function onChangeInput(value) {
        setselect(value)
    }

    const edit = async () => {
        const res = await Axios.put(`/product/list/${_id}`, sel)
        setselect(res)
    }


    const options = [
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Delivered', label: 'Delivered' }
    ]

    useEffect(() => {
        
        loaduser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


   
        return (
            <>
                <Navbar />

                <div className='container'>
                    <h1 className='text-center mt-5 mb-3'>Details</h1>
            {loading && <LoadingSpinners/>}
                    <Row>
                        <Col sm={8}>
                            <div className="w3-container">


                                <div className="w3-card-4" style={{ "width": "80%" }}>
                                    <header className="w3-container w3-light-grey">
                                        <h3>{address.name}</h3>
                                    </header>
                                    <div className="w3-container">
                                        <div className='d-flex flex justify-content-between'>
                                            <caption>Products List</caption>
                                            <caption>Total:<span style={{ 'fontWeight': 'bold', 'color': 'red' }}> &#8377;{items.total}/-</span></caption>
                                        </div>
                                        <hr />
                                        {
                                            data.map((item, key) => {
                                                return (
                                                    <div className=''>
                                                        <div key={key} className='d-flex justify-content-between '>
                                                            <div className='mb-1'>
                                                                <img src={item?.image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ "width": "70px" }} />
                                                            </div>
                                                            <div>
                                                                <p className='tex-center' style={{ 'fontWeight': 'bold' }}>{item?.name}</p>
                                                            </div>
                                                            <div>
                                                                <p className='text-center ml-1' style={{ 'fontWeight': 'bold', 'color': 'green' }}> &#8377;{item?.price}/hr </p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                )
                                            })
                                        }
                                    <p><span style={{ 'fontWeight': 'bold' }}>Start-Time:-</span> {items?.starttime}</p>
                                    <p><span style={{ 'fontWeight': 'bold' }}>End-Time:-</span> {items?.endtime}</p>
                                        <br />
                                        <p><span style={{ 'fontWeight': 'bold' }}>Country:-</span> {address?.country}</p>
                                        <p><span style={{ 'fontWeight': 'bold' }}>City:-</span> {address?.city}</p>
                                        <p><span style={{ 'fontWeight': 'bold' }}>Address:- </span>{address?.address}</p>
                                        <p><span style={{ 'fontWeight': 'bold' }}>Pincode:-</span> {address?.pincode}</p>
                                    </div>
                                    <hr />
                                    <p className='m-3'><span style={{ 'fontWeight': 'bold' }}>Status:-</span> <span style={{ 'fontWeight': 'bold', 'color': 'green' }}>{items?.status}</span></p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className='w3-container'>

                                <div className='w3-card-4 container'>
                                    <form>
                                        <h3 className='text-center'>Change Status</h3>
                                        <Select options={options} onChange={onChangeInput} styles={{ 'width': '20px' }} placeholder='status' />
                                        <br />
                                        {/* <Stepper
                    steps={[{ label: 'pending' }, { label: 'shipped' }, { label: 'delivered' }]}
                     activeStep={2}
                 /> */}
                                        <button className='btn btn-danger my-3' style={{ 'width': '100%' }} onClick={edit}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div >
            </>
        )

    
}

export default ProductDetails
