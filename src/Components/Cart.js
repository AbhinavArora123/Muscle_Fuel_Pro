import React, { Fragment } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../actions/cartActions';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material';
import { Button1 } from './Button1';
import { useNavigate } from 'react-router-dom';
import MetaData from './MetaData';

function Cart() {
    const dispatch=useDispatch();
    const history=useNavigate();
    const {cartItems}=useSelector((state)=>state.cart);

    const increaseQuantity=(id,quantity,stock)=>{
    const newQty=quantity+1;
    if(stock<=quantity){
        return;
    }
    dispatch(addItemsToCart(id,newQty));
    }
    const decreaseQuantity=(id,quantity,)=>{
    const newQty=quantity-1;
    if(1>=quantity){
        return;
    }
    dispatch(addItemsToCart(id,newQty));
    }

    const deleteCartItems=(id)=>{
        dispatch(removeItemsFromCart(id));
    }

    const checkOutHandler=()=>{
        history('/signup?redirect=shipping')
    }
  return (
    <Fragment>
        {cartItems.length===0?(
            <div className='emptyCart'>
                <RemoveShoppingCartIcon/>
                <Typography>Cart is Empty!</Typography>
                <Button1/>
            </div>
        ):<Fragment>
        <MetaData title='Cart-MUSCLE FUEL PRO' />
        <div className='cartPage'>
        <div className='cartHeader'>
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        </div>
        
        {cartItems && cartItems.map((item)=>(
            <div className='cartContainer' key={item.product}>
        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
        <div className='cartInput'>
        <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
        <input readOnly type='number' value={item.quantity}></input>
        <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
        </div>
        <p className='cartSubtotal'>{`₹${
            item.price*item.quantity
        }`}</p>
        </div>
        ))}
        
        <div className='cartGrossProfit'>
        <div></div>
        <div className='cartGrossProfitBox'>
        <p>Gross Total</p>
        <p>{`₹${cartItems.reduce(
            (acc,item)=>acc + item.quantity * item.price,0
        )}`}</p>
        </div>
        </div>
        <div className='checkOutBtn'>
        <button onClick={checkOutHandler} >Check Out</button>
        </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Cart