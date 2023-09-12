import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button1() {
  return (
    <Link to='/allProducts'>
      <button className='glow-on-hover' style={{width:'17vmax'}}>ALL PRODUCTS</button>
    </Link>
  );
}