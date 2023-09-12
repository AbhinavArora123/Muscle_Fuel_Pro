import React, { Fragment, useEffect, useState } from 'react';
// import Carousel from 'better-react-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors,getProductDetails, newReview } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
// import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import MetaData from './MetaData';
import {addItemsToCart} from '../actions/cartActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../constants/productConstants';
// import Carousel from 'better-react-carousel';
import Carousel from "react-material-ui-carousel";
// import { Carousel } from 'react-carousel-minimal';

function ProductDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { productDetails, loading ,error} = useSelector((payload) => payload.productDetails)
    const {success,error:reviewError}=useSelector((state)=>state.newReview);

    const options = {
        size: 'large',
        value: productDetails.ratings,
        readOnly:true,
        precision:0.5
    }
    
    const [quantity,setQuantity]=useState(1);
    const [open,setOpen]=useState(false);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("");
    
    
    const increaseQuantity=()=>{
        if(productDetails.Stock<=quantity){
            return;
        }
        const qty=quantity+1;
        setQuantity(qty);
    }
    const decreaseQuantity=()=>{
        if(1>=quantity){
            return;
        }
        const qty=quantity-1;
        setQuantity(qty);
    }

    const submitRiviewToggle=()=>{
        open?setOpen(false):setOpen(true);
    }

    const addToCartHandler=()=>{
        dispatch(addItemsToCart(id,quantity));
        window.alert('Item Added To Cart');
    }

    const reviewSubmitHandler=()=>{
        const myForm=new FormData();
        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",id);

        dispatch(newReview(myForm));
        setOpen(false);
    }

    useEffect(()=>{
        if(error){
            window.alert(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            window.alert(reviewError);
            dispatch(clearErrors());
        }

        if(success){
            window.alert('Review Submitted Successfully');
            dispatch({type:NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(id));
    },[dispatch,error,id,reviewError,success]);
    
    // useEffect(() => {
    //     dispatch(getProductDetails(id));
    // }, [dispatch, id]);
    // console.log();
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`${productDetails.name}--MUSCLE FUEL PRO`} />
                    <div className='ProductDetails'>
                        
                            <div >
                            
              <div>
              <Carousel>
                {productDetails.images &&
                  productDetails.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
              
                        </div>
                        <div>
                            <div className='detailsBlock-1'>
                                <h2>{productDetails.name}</h2>
                                <p>Product:{productDetails._id}</p>
                            </div>
                            <div className='detailsBlock-2'>
                                <Rating {...options} />
                                <span className='detailsBlock-2-span'>({productDetails.numOfReviews} Reviews)</span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>{`₹${productDetails.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type='number' />
                                        <button onClick={increaseQuantity}>+</button>
                                        <button disabled={productDetails.Stock<1?true:false} onClick={addToCartHandler}>Add to Cart</button>
                                    </div>
                                </div>
                                <p>
                                    Status:
                                    <b className={productDetails.Stock < 1 ? "redColor" : "greenColor"}>
                                        {productDetails.Stock < 1 ? "Out of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailsBlock-4'>
                                Description:<p>{productDetails.description}</p>
                                <button onClick={submitRiviewToggle} className='submitReview'>Submit Review</button>
                            </div>
                        </div>
                    </div>
                    <h3 className='reviewsHeading'>REVIEWS</h3>
                    <Dialog
                    aria-labelledby='simple-dialog-title'
                    open={open}
                    onClose={submitRiviewToggle}
                    >
                    <DialogTitle>
                        Submit Review
                    </DialogTitle>
                    <DialogContent className='submitDialog'>
                        <Rating
                            onChange={(e)=>setRating(e.target.value)}
                            value={rating}
                            size='large'
                        />
                        <textarea className='submitDialogTextArea' 
                            cols='30'
                            rows='5'
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button color='secondary' onClick={submitRiviewToggle} >Cancel</Button>
                        <Button color='primary' onClick={reviewSubmitHandler} >Submit</Button>
                    </DialogActions>
                        
                    </Dialog>
                    {productDetails.reviews && productDetails.reviews[0] ? (
                        <div className='reviews'>
                            {
                                productDetails.reviews && productDetails.reviews.map((review) => <ReviewCard key={review._id} review={review} />)
                            }
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )}
                </Fragment>}
        </Fragment>
    )
}

export default ProductDetails;