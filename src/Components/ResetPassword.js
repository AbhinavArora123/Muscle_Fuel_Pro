import React, { Fragment, useEffect, useState } from 'react';
import './ResetPassword.css';
import Loader from './Loader';
import MetaData from './MetaData';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../constants/userConstants';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';


function ResetPassword() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const {token}=useParams();
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("newPassword", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(token, resetPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            window.alert(error);
            dispatch(clearErrors());
        }
        if (success) {
            window.alert("Password Updated Succesfully");
            history('/signup');
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [history, error, success, dispatch])
  return (
    <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Change Password" />
                <div className='resetPasswordContainer'>
                    <div className='resetPasswordBox'>
                        <h2 className='resetPasswordHeading'>RESET PASSWORD</h2>
                        <form
                            className='resetPasswordForm'
                            onSubmit={resetPasswordSubmit}>

                    <div className='loginPassword'>
                    <LockOpenIcon/>
                    <input
                        type='password'
                        placeholder='New Password' required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    </div>
                    <div className='loginPassword'>
                    <LockIcon/>
                    <input
                        type='password'
                        placeholder='Confirm Password' required
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    </div>

                    <input
                        type='submit'
                        value='Update'
                        className='resetPasswordBtn'
                            />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
  )
}

export default ResetPassword