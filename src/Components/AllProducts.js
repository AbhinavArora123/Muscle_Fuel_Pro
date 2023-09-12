import React, { Fragment, useEffect, useState } from 'react';
import './AllProducts.css';
import Products from './Products';
import MetaData from './MetaData';
// import { getProduct } from './actions/productAction';
import { getProduct } from '../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
// import {useAlert} from 'react-alert';
// import { useParams } from 'react-router-dom';
import  Pagination  from 'react-js-pagination';
// import Typography from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import { Slider } from '@mui/material';


const categories=[
  "Peanut-Butter",
  "Protein",
  "Shake",
  "Bar",
  "Chocolate",
  "Vanilla",
  "Butter",
  "Powder"
]


function AllProducts({keyword}) {
  // const alert=useAlert();
  const dispatch = useDispatch();
  // const keyword=useParams();

  const [currentPage,setCurrentPage]=useState(1);
  const [price,setPrice]=useState([0,25000]);
  const[category,setCategory]=useState("");
  const[ratings,setRatings]=useState(0);

  const { loading, products, productsCount,resultPerPage } = useSelector(
    (state) => state.products
  );


  // useEffect(() => {
  //   if(error){
  //     return alert.error(error);
  //   }
  //   dispatch(getProduct());
  // }, [dispatch,error,alert]);

    const setCurrentPageNo=(e)=>{
      setCurrentPage(e);
    }
    const priceHandler=(event,newPrice)=>{
      setPrice(newPrice);
    }
    useEffect(()=>{
      dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings]); 
    // let count=filtererdProductsCount;
  console.log(products);

  return (
    <Fragment>
      {loading ? <Loader/> : <Fragment>
        <MetaData title="ALL PRODUCTS--MUSCLE FUEL PRO" />
        <div className='pros'>
          <div className='head'>
            <h1>All Products</h1>
          </div>
          <div className='container' id='container'>
            {products && products.map((product) =>
              <Products product={product} />
            )}
              {resultPerPage===0 && (
              <div>
                <h2>No Products available</h2>
              </div>
            )}
          </div>
        </div>

        <div className='filterBox'>
            <Typography style={{fontSize:"1.8vmax" ,borderBottom:'1px solid black'}}>Price</Typography>
            <Slider
              value={price}
              step={100}
              // disableSwap='true'
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />
            <Typography style={{fontSize:"1.8vmax" ,borderBottom:'1px solid black'}}>Categories</Typography>
            <ul className='categoryBox'>
              {categories.map((category)=>(
                <li className='category-link'
                  key={category}
                  onClick={()=>setCategory(category)} >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend" style={{borderBottom:'1px solid black'}}>
                Ratings Above
              </Typography>
              <Slider
                value={ratings}
                onChange={(e,newRating)=>{
                  setRatings(newRating);
                }}
                aria-labelledby='continuous-slider'
                min={0}
                max={5}
                valueLabelDisplay='auto'
              />
            </fieldset>
        </div>


        {resultPerPage<productsCount && (<div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
        </div>)}
      </Fragment>}
    </Fragment>
  );
}

export default AllProducts;
