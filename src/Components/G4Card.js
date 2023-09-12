import React from 'react';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import './AllProducts.css';

function G4Card({product}) {

    const options = {
        // size:'large',
        value: product.ratings,
        precision:0.5,
        readOnly:true
      };
  return (
    // <div className='card' >
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name}></img>
      <p>{product.name}</p>
      <div>
        <Rating {...options} /> <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
      
    </Link>
        // </div>
  )
}

export default G4Card