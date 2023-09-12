import React from 'react';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './OrderSuccess.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


function OrderSuccess() {
  return (
    <div className='orderSuccess'>
    {/* <CheckCircleIcon/> */}
    <div class="wrapper"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
    <Typography>Your Order has been Successfully Placed</Typography>
    <Link to='/orders' >View Order</Link>
    </div>
  )
}

export default OrderSuccess;