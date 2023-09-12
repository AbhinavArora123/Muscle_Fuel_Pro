import React, { Fragment, useState } from 'react'
import './UserOptions.css';
import SpeedDial from '@mui/material/SpeedDial';
import Backdrop from '@mui/material/Backdrop';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
// import { SpeedDialIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
// import green from "@mui/icons-material/core/colors/green";

// import HomeIcon from "@material-ui/icons/HomeTwoTone";

function UserOptions({user}) {
  const history=useNavigate();
    const[open ,setOpen]=useState(false);
    const dispatch=useDispatch();
    const {cartItems}=useSelector((state)=>state.cart);
    const options=[
      {icon:<ListAltIcon/>,name:"Orders",func:orders},
      {icon:<PersonIcon/>,name:"Pofile",func:account},
      {icon:<ShoppingCartIcon />,name:`Cart(${cartItems.length})`,func:cart},
      {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},
    ]

    if(user.role==="admin"){
      options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard})
    }

    function dashboard(){
      history('/admin/dashboard');
    }
    function orders(){
      history('/orders');
    }
    function account(){
      history('/account');
    }
    function cart(){
      history('/cart');
    }
    function logoutUser(){
      dispatch(logout());
      window.alert("Logout Successful");
    }
  return (
    <Fragment >
    <Backdrop open={open} style={{zIndex:"9"}}  />
        <SpeedDial
         sx={{ '& .MuiFab-primary': {  color: 'blue' } }}
         style={{zIndex:"11"}}
         
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        
        className='speedDial'
        
        icon={<img className='speedDialIcon'
        src={user.avatar.url?user.avatar.url:'/pintola.jpg'}
        alt='Profile'

         />} 
         
         direction='down'
        >
        {
          options.map((item)=>(
            <SpeedDialAction
            key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=645?true:false} />
          ))
        }
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions