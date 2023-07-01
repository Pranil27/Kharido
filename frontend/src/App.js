
import './App.css';
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer.js"
import {BrowserRouter as Router} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"
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

function App() {

  const {isAuthenticated , user} =  useSelector((state)=>state.user)


  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid sans","Chilanka"]
      }
    });

    store.dispatch(loadUser());
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
    </Routes>
    

    <Footer />
  
  </Router>;
}

export default App;
