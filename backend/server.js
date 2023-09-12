const app=require('./app');

const dotenv=require("dotenv");
const connectDatabase=require('./config/database')
// dotenv.config({path:"../config/config.env"});
dotenv.config({path:"./config/config.env"});
const cloudinary=require('cloudinary');


//HANDLING UNCAUGHT EXCEPTION:
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unCaught Error`);
    process.exit(1);
})

// console.log(you);


// const PORT=4000;

connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

// const server=app.listen(PORT,()=>{
//      console.log(`Server is working on http://localhost: ${PORT}`)
// });

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//UNHANDLED PROMISE REJECTION:
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server dur to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})