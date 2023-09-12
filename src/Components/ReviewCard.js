import React from 'react';
// import ReactStars from 'react-rating-stars-component';
import profilePng from "./Images/pintola.jpg";
import './ProductDetails.css';
import { Rating } from '@mui/material';

function ReviewCard({review}) {
    const options = {
        value: review.rating,
        isHalf: true,
        precision:0.5,
        edit:false 
    }
  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating className='reviewCardComment' {...options} readOnly />
        <p style={{fontWeight:'400'}}>{review.comment}</p>
    </div>
  )
}

export default ReviewCard