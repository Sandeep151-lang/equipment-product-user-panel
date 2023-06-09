// import axios from 'axios';
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
// import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Redirect } from "react-router-dom";
import { Axios } from './commonApi/commonApi';


const Stripe = (props) => {
    const { total, name, email, cart, id, starttime, endtime, Total } = props;
    const token = localStorage.getItem('hiringJwt')
  
    const handleToken = async (token) => {
        //console.log(token)
        try {
            const res = await Axios.post(`/payment`, {
                token: token.id,
                total,
                cart,
                name,
                email,
                id,
                address: token.card,
                starttime,
                endtime,
                Total
            });
            if (res.status === 200) {
                toast(`order successful`)
            } else {
                toast(`order not successful`)
            }

            // window.alert('order successfull')
        } catch (error) {
            toast(`order not successful`)


        }
    }

    if (token) {
        return (
            <StripeCheckout
                email={email}
                name={name}
                amount={total * 100}
                currency="INR"
                token={handleToken}
                shippingAddress
                stripeKey="pk_test_51K1p90SJsqVvBs7npny7nMtvteAWloxVwaITgnSKRh3gTXqoRHWThem1HW7bQpl0ldekn1jJJJJZU6cEjm6SANfw00EdhkkMey"
            >
                <Button className="btn btn-danger">Book Now</Button>
                <ToastContainer />
            </StripeCheckout>
        )
    } else {
        return <Redirect to='/login' />

    }

}

export default Stripe