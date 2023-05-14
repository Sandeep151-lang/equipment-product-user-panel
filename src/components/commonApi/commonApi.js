// import React from 'react'
import axios from 'axios'

const token = localStorage.getItem("hiringJwt")
console.log(token,"token")
//  const local="http://localhost:5000"
const server="https://equipment-hiring-node.vercel.app"
 export const Axios = axios.create({
        baseURL:server,
        headers: {'Authorization':  `Bearer ${token}`
      }
      })
      
