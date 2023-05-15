
// import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePages from './components/HomePages';
import HomePage from './components/HomePage';
//import Navbar from './components/Navbar';
import CreaProduct from './components/CreaProduct';
// import axios from 'axios';
import Cart from "./components/Cart";
import ProductDetail from './components/ProductDetail'
import ProductDetails from './components/ProductDetails'
import Register from './components/Register';
import Login from './components/Login'
import { initialState, reducer } from './components/reducer/reducer';
import About from './components/About'
import Logout from './components/Logout'
import MyOrder from './components/MyOrder';
import UserOrder from './components/UserOrder';
import AdminDashboard from './components/AdminDashboard';
import UserDetails from './components/UserDetails';
import './App.css'
import { Axios } from './components/commonApi/commonApi';
//import 'bootstrap/dist/css/bootstrap.min.css';

export const MyContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const carts = JSON.parse(localStorage.getItem('cart') || "[]")
  const [data, setdata] = useState([]);
  const [cartItems, setCartItems] = useState(carts);

  const onAdd = (product) => {
    setCartItems([...cartItems, product])
  }

  //const url = `https://hackathon2-back.herokuapp.com/getProduct`;
  const url = `/getproduct`
  const userdata = async () => {
    try {
      const d = await Axios.get(url);
      //console.log(d)
      setdata(d?.data?.message);

    } catch (err) {
      console.log(err, "errr");
    }
  }

  const onRemove = async (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id))
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])


  useEffect(() => {
    userdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const token = localStorage.getItem('hiringJwt')

  const adminToken = localStorage.getItem('role')

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          adminToken ==="user" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }

  function AdminPrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          adminToken==="admin" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }

  function UserAdminRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          adminToken ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }

  function LoginPrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          !token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }


  return <>
    <Router>
      <MyContext.Provider value={{ userdata, onRemove, onAdd, data, cartItems, state, dispatch }}>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path='/' component={HomePages} />
          <Route path="/cart" component={Cart} />
          <Route path="/cat/:name" component={HomePage} />
          <Route path="/details/:_id" component={ProductDetail} />
          <Route path='/logout' component={Logout} />
          <Route path="/products/:_id" component={ProductDetails} />
          <LoginPrivateRoute path="/Register" component={Register} />
          <LoginPrivateRoute path="/login" component={Login} />
          <UserAdminRoute path='/my-order' component={MyOrder} />
          <UserAdminRoute path='/user/:_id' component={UserOrder} />
          <UserAdminRoute path="/about" component={About} />
          <AdminPrivateRoute path='/create' component={CreaProduct} />
          <AdminPrivateRoute path='/dashboard' component={AdminDashboard} />
          <AdminPrivateRoute path="/user" component={UserDetails} />
          <Redirect to="/" />
        </Switch>
      </MyContext.Provider>
    </Router>
  </>;
}

export default App;
