import React from 'react';
import { Card } from 'reactstrap'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'


const About = () => {
   
   const email = sessionStorage.getItem('email')
    const name = sessionStorage.getItem('name')
    const role = localStorage.getItem('role')
   
        return (
            <>
                <Navbar />

                <div className='w3-container'>

                    <h1 className="text-center">{role==="user" ? "User Details" : "Admin Details"}</h1>

                    <div className="container mt-5" style={{ "width": "80%", "height": "70%" }}>
                        <Card>
                            <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Name :</span> <span className="text-center text-dark" style={{ 'fontSize': '19px' }}>{name}</span></p>
                            <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Email_id :</span> <span className="text-dark" style={{ 'fontSize': '19px' }}>{email}</span></p>
                            <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Role : </span><span className="text-dark" style={{ 'fontSize': '19px' }}>{role}</span></p>
                        </Card>
                    </div>
                </div>
            </>
        )
    
}

export default About