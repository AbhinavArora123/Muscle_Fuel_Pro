import React, { Fragment, useEffect, useState } from 'react';
import './ForgotPassword.css';
import Loader from './Loader';
import MetaData from './MetaData';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../actions/userAction';

function ForgotPassword() {
    const dispatch = useDispatch();

//     const[email,setEmail]=useState("");

//   const { error, message, loading } = useSelector((state) => state.forgotPassword);

//   const forgotPasswordSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();
//     myForm.set("email", email);
//     dispatch(forgotPassword(myForm));
//   };
const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(()=>{
    if(error){
        window.alert(error);
        dispatch(clearErrors());
    }
    if(message){
        window.alert(message);
    }
  },[dispatch,error,message]);

  return (
    // <Fragment>
    //         {loading ? <Loader /> : <Fragment>
    //             <MetaData title="Forgot Password" />
    //             <div className='forgotPasswordContainer'>
    //                 <div className='forgotPasswordBox'>
    //                     <h2 className='forgotPasswordHeading'>FORGOT PASSWORD</h2>
    //                     <form
    //                         className='forgotPasswordForm'
    //                         onSubmit={forgotPasswordSubmit}>

    //             <div className='loginEmail'>
    //                 <MailOutlineIcon/>
    //                 <input
    //                     type='email'
    //                     placeholder='Email' required
    //                     value={email}
    //                     onChange={(e)=>setEmail(e.target.value)}
    //                 />
    //                 </div>
                    
    //                 <input
    //                     type='submit'
    //                     value='Send'
    //                     className='forgotPasswordBtn'
    //                         />
    //                     </form>
    //                 </div>
    //             </div>
    //         </Fragment>}
    //     </Fragment>
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ForgotPassword