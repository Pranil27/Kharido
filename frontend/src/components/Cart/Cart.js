import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard.js';
import profile from '../../image/Profile.png'
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemFromCart } from '../../actions/cartAction';
import  RemoveShoppingCartIcon  from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Cart = () => {

    const dispatch = useDispatch();

    const {cartItems} = useSelector((state)=>state.cart);
  
    const increaseQuantity = (id , quantity , stock) =>{
        const newQuantity = quantity+1;
        if(stock<=quantity) return;
        dispatch(addItemsToCart(id,newQuantity));
    }

    const decreaseQuantity = (id , quantity ) =>{
        const newQuantity = quantity-1;
        if(1>=quantity) dispatch(removeItemFromCart(id));
        else dispatch(addItemsToCart(id,newQuantity));
    }

  return (
    <Fragment>
        {cartItems.length === 0? (
            <div className='emptyCart'>
                <RemoveShoppingCartIcon/>
                <Typography>No Product in Your Cart.</Typography>
                <Link to="/products">View Products</Link>
            </div>
        ):
        <Fragment>
        <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
                </div>
                
                {cartItems && cartItems.map((item)=>(
                    <div className='cartContainer' key={item.product}>
                    <CartItemCard item={item}  />
                    <div className='cartInput'>
                        <button onClick={() => decreaseQuantity(item.product,item.quantity,item.stock)}>-</button>
                        <input type='number' value={item.quantity} readOnly/>
                        <button onClick={() => increaseQuantity(item.product , item.quantity)} >+</button>
                    </div>
                    <p className='cartSubtotal'>{`₹${item.price *item.quantity}`}</p>
                </div>
                ))}

                <div className='cartGrossTotal'>
                    <div></div>
                    <div className='cartGrossTotalBox'>
                        <p>Gross Total</p>
                        <p>{`₹${cartItems.reduce((sum,i) => sum+i.price*i.quantity,0)}`}</p>
                    </div>
                    <div></div>
                    <div className='checkOutBtn'>
                        <button>Check Out</button>
                    </div>
                </div>
            
        </div>
    </Fragment>
    }
    </Fragment>
  )
}

export default Cart