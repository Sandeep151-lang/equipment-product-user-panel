import React, { useEffect, useContext } from 'react'
// import axios from 'axios'
import { useHistory } from 'react-router'
import { MyContext } from '../App'
import LoadingSpinners from './LoadingSpinner'
import { Axios } from './commonApi/commonApi'

const Logout = () => {
    const { dispatch } = useContext(MyContext)
    const history = useHistory();
    useEffect(() => {
        Axios.post('/logout').then((res) => {
            if(res){
                localStorage.removeItem("hiringJwt");
                localStorage.removeItem('role')
                localStorage.removeItem("id")
                dispatch({ type: 'USER', payload: false })
                history.push('/login', { replace: true })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <LoadingSpinners />
        </div>
    )
}

export default Logout