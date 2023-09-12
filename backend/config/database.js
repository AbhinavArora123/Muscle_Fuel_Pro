const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config/config.env'})

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log(`mongodb connected with server : ${data.connection.host}`);
    })
    // .catch((err)=>{
    //     console.log(err.stack);
    // })
}

module.exports=connectDatabase;
        // mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then((data)=>{