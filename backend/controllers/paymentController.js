const catchAsyncErrors=require('../middleware/catchAsyncErrors');

// const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);


const stripe=require('stripe')('sk_test_51NR6vqSHQOCQaXaPPP94xLgRSmk1974xrBqvXxyKjOZ4l9I36sXzlaCYpTFEHA4VgaWHJUqx8qyalo8oIGcuJN5x00Jm5HPZh9')

exports.processPayment=catchAsyncErrors(async(req,res,next)=>{
    const myPayment=await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount:req.body.amount,
        currency:'inr',
        metadata:{
            company:"GymSupps",
        },
        // mode:"payment",
    });
    res.status(200).json({success:true,client_secret:myPayment.client_secret});
})


exports.sendStripeApiKey=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
})