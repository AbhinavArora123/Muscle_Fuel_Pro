import React, { Fragment } from 'react'
import './CartItemCard.css';
// import { removeItemsFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartItemCard({item,deleteCartItems}) {
  return (
    <Fragment>
        <div className='CartItemCard'>
        <img src={item.image} alt='product'/>
        <div>
            <Link to={`/product/${item.product}`}>
                {item.name}
            </Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
        </div>
        </div>
    </Fragment>
  )
}

export default CartItemCard