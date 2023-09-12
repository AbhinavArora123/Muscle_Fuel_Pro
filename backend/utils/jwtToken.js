const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTTOKEN();

    //option for cookie:
    // const options={
    //     expires:new Date(
    //         Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    //     ),
    //     httponly:true,
    // };
    res.status(statusCode).cookie('token',token,{ maxAge:process.env.COOKIE_EXPIRE*24  * 60 * 60 * 1000, httpOnly: true }).json({
        success:true,
        user,
        token
    });
}

module.exports=sendToken;