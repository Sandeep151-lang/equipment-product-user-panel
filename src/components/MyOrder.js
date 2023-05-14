import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import { useHistory, NavLink } from 'react-router-dom'
// import LoadingSpinner from './LoadingSpinner';
import Navbar from './Navbar';
// import { Axios } from './commonApi/commonApi';

const MyOrder = () => {
    const history = useHistory()
    const [lis, setlist] = useState([])


    const list = async () => {
       
        const token = localStorage.getItem('hiringJwt')
        try {
            
            const payload = {
                token
            }
            const res = await axios.post('https://equipment-hiring-node.vercel.app/getdetails',payload)

            if (res.status === 200) {
                setlist(res.data.message)
            }
        } catch (err) {
            history.push('/login')
        }
    }


    const edit =  (_id) => {
        try {
            // await Axios.get(`/product/${_id}`)
            history.push(`/user/${_id}`)
        } catch {
            console.log('error')
        }
    }

    useEffect(() => {
      
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const p = { message: lis };
    const ar = p.message.map((product) => product);
    //console.log(`message${ar.length}`)
     if (ar.length > 0) {
        return (
            <>
                <Navbar />
                <div className='container mt-5'>

                    <table className="table caption-top">
                        <caption>List of Orders</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product ID</th>
                                <th scope='col'>Status</th>
                                <th scope="col">View-Product</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                lis.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            <td>{item._id}</td>
                                            <td style={{ 'fontWeight': 'bold', 'color': '#a9559b' }}>{item.status}</td>
                                            <td><Button className='btn btn-success' onClick={(e) => { edit(item._id) }}><i className="fal fa-edit"></i></Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </>
        )
    } else {
        return (
            <>
                <Navbar />

                <div className='w3-container'>
                    <div className='w3-card-4 container user-detail'>
                        <NavLink to='/'><i className="fas fa-shopping-cart" style={{ 'fontSize': '100px', 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-50%)', 'color': '#ff2f00d6' }}></i></NavLink>
                        <NavLink to='/'><h1 style={{ 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-262%)', 'color': 'black', 'fontSize': '29.5px' }}>Shop Now</h1></NavLink>
                    </div>
                </div>
            </>
        )
    }
}

export default MyOrder