const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');

//Create Product-->ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images=[];
    if(typeof(req.body.images)==='string'){
        images.push(req.body.images);
    } else{
        images=req.body.images;
    }

    const imagesLink=[];
    for(let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
            folder:"products",
        });
        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url
        });
    }
    req.body.images=imagesLink;

    req.body.user=req.user.id;
    
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})



//GET ALL PRODUCTS:
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    // return next(new ErrorHandler('temp err',404));

    // const apiFeatue=new ApiFeatures(Product.find(),req.query).search();
    const resultPerPage = 8;
    const productsCount=await Product.countDocuments();

    const apiFeatue = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

    // let filteredProductsCount=products.length;

    const products = await apiFeatue.query;
    res.status(200).json({ success: true, 
        products,
        productsCount,
        resultPerPage,
 });
})


//GET ALL PRODUCTS(ADMIN):
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {

   const products=await Product.find();
    res.status(200).json({ success: true, 
    products });
})

//UPDATE PRODUCT-->ADMIN

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            msg: 'Product not found'
        })
    }

    let images=[];
    if(typeof req.body.images==='string'){
        images.push(req.body.images);
    } else{
        images=req.body.images;
    }

    if(images!==undefined){
        for(let i=0;i<product.length;i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

    const imagesLink=[];
    for(let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
            folder:"products",
        });
        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url
        });
    }
    req.body.images=imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
})



//GET PRODUCT DETAILS:
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {

        return next(new ErrorHandler("Product not found", 404));

    }

    res.status(200).json({
        success: true,
        product
    })

})



//DELETE PRODUCT:

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        // if (!product) {

            return next(new ErrorHandler("Product not found", 404));

        // }
    }

    //DELETING IMAGES FROM CLOUDINARY on deleting admin product:
    for(let i=0;i<product.images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }


    await product.deleteOne();
    res.status(200).json({
        success: true,
        msg: "Product deleted successfully"
    })
})


//CREATE REVIEW OR UPDATE THE REVIEW
// exports.createProductReview=catchAsyncErrors(async (req,res,next)=>{
//     const {rating,Comment,productId}=req.body;
//     const review={
//         user:req.user._id,
//         name:req.user.name,
//         rating:Number(rating),
//         comment
//     };
//     const product=await Product.findById(productId);

//     const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

//     if(isReviewed){
//         product.reviews.forEach(rev=>{
//             if(rev.user.toString()===req.user._id.toString()){
//             rev.rating=rating,
//             rev.Comment=comment
//             }
//         })
//     } else{
//         product.reviews.push(review),
//         product.numOfReviews=product.reviews.length
//     }

//     let avg=0;
//     product.reviews.forEach((rev)=>{
//         avg+=rev.rating
//     })

//     product.ratings=avg/product.reviews.length

//     await product.save({validateBeforeSave:false});
//     res.status(200).json({
//         success:true
//     })
// })

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });


//get all reviews
exports.getAllReviews=catchAsyncErrors(async (req,res,next)=>{
    const product=await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})


exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });