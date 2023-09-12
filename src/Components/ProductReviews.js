import React, { Fragment, useEffect, useState } from 'react';
import './ProductReviews.css';
import './Dashboard.css';
import {useDispatch,useSelector} from 'react-redux';
import Sidebar from './Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from './MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, getAllReviews,deleteReviews } from '../actions/productAction';
import { DELETE_REVIEW_RESET } from '../constants/productConstants';
import StarIcon from '@mui/icons-material/Star';


function ProductReviews() {
  const dispatch=useDispatch();
  const history=useNavigate();
  
  const {error:deleteError,isDeleted}=useSelector((state)=>state.review);

  const {error,reviews,loading}=useSelector((state)=>state.productReviews);

  const [productId,setProductId]=useState("");

  const deleteReviewHandler=(reviewId)=>{
    dispatch(deleteReviews(reviewId,productId));
  }

  const productReviewSubmitHandler=(e)=>{
    e.preventDefault();
    dispatch(getAllReviews(productId));
  }

  useEffect(()=>{
    if(productId.length===24){
        dispatch(getAllReviews(productId))
    }
    if(error){
      window.alert(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      window.alert(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      window.alert("Review Deleted Successfully");
      history('/admin/reviews');
      dispatch({type:DELETE_REVIEW_RESET});
    }
  },[dispatch,error,deleteError,isDeleted,history,productId]);

  const columns=[
    {field:'id',headerName:"Review ID",minWidth:200,flex:0.5},
    
    {
        field:"user",
        headerName:"User",
        type:'text',
        minWidth:200,
        flex:0.6
    },
    {
      field:"comment",
      headerName:"Comment",
      minWidth:350,
      flex:1,
    },
    {
      field:"rating",
      headerName:"Rating",
      type:'number',
      minWidth:180,
      flex:0.4,
      cellClassName:(params)=>{
        return (params.rating)>=3
        ? 'greenColor'
        :'redColor'
      }
    },
    {
      field:"actions",
      headerName:"Actions",
      type:'number',
      minWidth:150,
      flex:0.3,
      sortable:false,
      renderCell:(params)=>{
        return(
          <Fragment>
            <Button onClick={()=>deleteReviewHandler(params.id)}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    },  
  ]

  const rows=[];

  reviews && 
  reviews.forEach((item)=>{
    rows.push({
      id:item._id,
      rating:item.rating,
      comment:item.comment,
      user:item.name
    })
  });

  return (
    <Fragment>
    <MetaData title="ALL REVIEWS-ADMIN" />
    <div className='dashboard' >
    <Sidebar/>
    <div className='productReviewsContainer' >
    <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={productReviewSubmitHandler}
          >
            <h1>ALL REVIEWS</h1>
            <div>
            <StarIcon/>
            <input
                type='text'
                placeholder='Product Id'
                required
                value={productId}
                onChange={(e)=>setProductId(e.target.value)}
            />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true: false
                }
            >
              Search
            </Button>
          </form>
    {
        reviews && reviews.length>0 ? <DataGrid
      rows={rows}
      columns={columns}
      pageSize={20}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    /> : <h1 className='productReviewsFormHeading'>No Review found</h1>
    }
    </div>
    </div>
    </Fragment>
  )
}

export default ProductReviews