
import './App.css';
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer.js"
import {BrowserRouter as Router} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import WebFont from "webfontloader"
import React, { useEffect, useState } from "react"
import Home from "./components/Home/Home.js"
import Loader from './components/layout/Loader/Loader';
import ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js"
import Search from "./components/Product/Search.js"
import LoginSignup from './components/User/LoginSignup';
import store from "./store.js";
import { loadUser } from './actions/userAction';
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword  from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js'
import ResetPassword from './components/User/ResetPassword.js'
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import Payment from './components/Cart/Payment.js'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess.js';


function App() {

  const {isAuthenticated , user} =  useSelector((state)=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const instance = axios.create();

  async function getStripeApiKey (){
    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid sans","Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  },[])


  return <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes>
    <Route  path="/" element={<Home/>}/>
    <Route path="/product/:id" element={<ProductDetails/>}/>
    <Route path="/products" element={<Products/>}/>
    <Route path="/products/:keyword" element={<Products/>}/>
    <Route path="/Search" element={<Search/>}/>
    <Route path="/login" element={<LoginSignup/>}/>
    <Route path="/account" element={<ProtectedRoute element={Profile}/>}/>
    <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile}/>}/>
    <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword}/>}/>
   <Route path="/password/forgot" element={<ForgotPassword/>}/> 
   <Route path="/password/reset/:token" element={<ResetPassword/>}/> 
   <Route path="/Cart" element={<Cart/>}/>
   <Route path='/login/shipping' element={<ProtectedRoute element={Shipping}/>}/>
   <Route path='/order/confirm' element={<ProtectedRoute element={ConfirmOrder}/>}/>
   
   
   {stripeApiKey && <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}>
                                              <ProtectedRoute element={Payment}/>   
                                           </Elements>}/>}

    <Route path='/success' element={<ProtectedRoute element={OrderSuccess}/>}/>

    </Routes>
    
    

    <Footer />
  
  </Router>;
}

export default App;
