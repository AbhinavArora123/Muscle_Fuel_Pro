import React from 'react';
import './FixedImages.css';
import freeShip from './Images/FreeShip.png';
import easy from './Images/easy.png';
import flexiblePay from './Images/flexiblePay.png';
import support from './Images/support.png';

function FixedImages() {
  return (
    <div className='fix'>
        <div className='fixComp'>
            <img src={freeShip} alt='freeShipImg' style={{width:'35%'}}></img>
            <h4>Free Shipping</h4>
            <p>Get Free shipping on orders above 999</p>
        </div>
        <div className='fixComp'>
            <img src={easy} alt='freeShipImg'></img>
            <h4>Easy Returns</h4>
            <p>Return your Order within 7 day of order</p>
        </div>
        <div className='fixComp'>
            <img src={support} alt='freeShipImg'></img>
            <h4>Online Support</h4>
            <p>Available 24 hours a day,<br/> 7 days a week</p>
        </div>
        <div className='fixComp'>
            <img src={flexiblePay} alt='freeShipImg'></img>
            <h4>Flexible Payment</h4>
            <p>Pay with Multiple payment options.</p>
        </div>
        
    </div>
  )
}

export default FixedImages