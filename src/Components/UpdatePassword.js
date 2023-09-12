import React, { Fragment, useEffect, useState } from 'react';
import './UpdatePassword.css';
import Loader from './Loader';
import MetaData from './MetaData';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../constants/userConstants';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function UpdatePassword() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            window.alert(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            window.alert("Profile Updated Succesfully");
            history('/account');
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [history, error, isUpdated, dispatch])
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Change Password" />
                <div className='updatePasswordContainer'>
                    <div className='updatePasswordBox'>
                        <h2 className='updatePasswordHeading'>UPDATE PASSWORD</h2>
                        <form
                            className='updatePasswordForm'
                            onSubmit={updatePasswordSubmit}>

                      <div className='loginPassword'>
                        <VpnKeyIcon />
                        <input
                            type='password'
                            placeholder='Old Password' required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                    <div className='loginPassword'>
                    <LockOpenIcon/>
                    <input
                        type='password'
                        placeholder='New Password' required
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
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
                        value='Change'
                        className='updatePasswordBtn'
                            />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword