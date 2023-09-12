import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Galary4.css';
import G4Card from './G4Card.js';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productAction';
import './AllProducts.css';

function Galary4({keyword}) {

    const dispatch=useDispatch();

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1500 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1500, min: 800 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const [currentPage,setCurrentPage]=useState(1);
      const [price,setPrice]=useState([0,25000]);
      const[category,setCategory]=useState("");
      const[ratings,setRatings]=useState(0);
      const { loading, products } = useSelector(
        (state) => state.products
      );

      useEffect(()=>{
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
      },[dispatch,keyword,currentPage,price,category,ratings]);
  return (
    <Fragment>
    {loading?<Loader/>:<Fragment>
        <div className='head' style={{borderBottom:'0'}}>
            <h2>Trusted Products</h2>
            <p>Premium Quality Products</p>
          </div>
    <Carousel responsive={responsive}
    showDots={true}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={4000}
      >
            {products && products.map((product) =>
              <G4Card product={product} />
            )}


      </Carousel>

    </Fragment>
    }
    </Fragment>
  )
}

export default Galary4