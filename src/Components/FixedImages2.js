import React from 'react';
import './FixedImages2.css';
import { Link } from 'react-router-dom';
import abs from './Images/abslean.png';
import arm from './Images/arm.jpg';
import lean from './Images/lean.jpeg';
import heart from './Images/heartimmunity.png';

// const slider=[
//     {
//       "id":1,
//       "image":`${abs}`,
//       "name":"Body Building"
//     },
//     {
//       "id":2,
//       "image":`${abs}`,
//       "name":"Bulking Up"
//     },
//     {
//       "id":3,
//       "image":`${abs}`,
//       "name":"Lean Muscle"
//     },
//     {
//       "id":3,
//       "image":`${abs}`,
//       "name":"Lean Muscle"
//     }
//   ]

function FixedImages2() {
  return (
    // <div className='linkCard'>
    // <Link   to='/allProducts'>
    // {
    //     slider.map(item=><div className='visitCard'>
    //   <img src={item.image} alt={item.id}></img>
    //   <p>{item.name}</p>
    // </div> )
    //   }
    // </Link>
    // </div>
    <div >
    <div className='fimages'>
    <h3>Shop By Your Goal</h3>
    <h5>All You Need To Fuel Your Zidd Is Here</h5>
    </div>
    <div className='linkCard'>
        <Link to='/allProducts'>
        <div className='visitCard'>
        <img src={arm} alt='mus' />
        <h3>Body Building</h3>
        </div>
        </Link>

        <Link to='/allProducts'>
        <div className='visitCard2'>
        <img src={lean} alt='mus' />
        <h3>Bulking Up</h3>
        </div>
        </Link>

        <Link to='/allProducts'>
        <div className='visitCard'>
        <img src={abs} alt='mus' />
        <h3>Lean Muscle Mass</h3>
        </div>
        </Link>

        <Link to='/allProducts'>
        <div className='visitCard2'>
        <img src={heart} alt='mus' />
        <h3>Immunity</h3>
        </div>
        </Link>
    </div>
    </div>
  )
}

export default FixedImages2