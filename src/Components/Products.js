import React from 'react';
import './AllProducts.css';
import { Link } from 'react-router-dom';
// import ReactStars from 'react-rating-stars-component';
import { Rating } from '@mui/material';

const Products = ({ product }) => {
  const options = {
    // size:'large',
    value: product.ratings,
    precision:0.5,
    readOnly:true
  };

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name}></img>
      <p>{product.name}</p>
      <div>
        <Rating {...options} /> <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
      
    </Link>
  );
};

export default Products;
