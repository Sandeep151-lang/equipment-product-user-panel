import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import LoadingSpinners from './LoadingSpinner'
import Navbar from './Navbar'
import { Axios } from './commonApi/commonApi'


const AdminDashboard = () => {
    const history = useHistory()
    const [lis, setlist] = useState([])
    const [loading, setloading] = useState(true);

    const list = async () => {
        setloading(true)
        try {
            setloading(false)
            const res = await Axios.get(`/lists`);
            setlist(res?.data?.item)
        } catch {
            setloading(false)
            window.alert('error')
        }
    }
    const remove = async (_id) => {
        try {
            await Axios.delete(`/list/${_id}`)
            list()
        } catch {
            console.log('error')
        }

    }

    const edit = async (_id) => {
        try {
            await Axios.get(`/product/${_id}`)
            history.push(`/products/${_id}`)
        } catch {
            console.log('error')
        }

    }

    useEffect(() => {
      
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (loading) {
        return <LoadingSpinners />
    } else {

        return (
            <>
                <Navbar />

                <div className='container mt-5'>
                    <h1 className='text-center'>Order List</h1>
                    <table className="table caption-top">
                        <caption>List of Orders</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">View</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lis.map((item, key) => {
                                    console.log(item)
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            <td>{item._id}</td>
                                            <td>{item.shippingAddress.name.toUpperCase()}</td>
                                            <td style={{ 'fontWeight': 'bold', 'color': '#a9559b' }}>{item.status}</td>
                                            <td><Button className='btn btn-success' onClick={(e) => { edit(item._id) }}><i className="fal fa-edit"></i></Button></td>
                                            <td><Button className='btn btn-danger' onClick={(e) => remove(item._id)}><i className="fas fa-trash-alt"></i></Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default AdminDashboard
