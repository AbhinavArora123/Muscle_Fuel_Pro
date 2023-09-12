import React, { useState} from 'react'
// import {IoIosAdd} from 'react-icons/io';
import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import { Button } from './Button';
// import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
// import UserOptions from './UserOptions';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';
// import { loadUser } from './actions/userAction';
import { clearErrors, loadUser } from '../actions/userAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Button1 } from './Button1';


function Navbar() {
  const dispatch=useDispatch();
  const[show,setShow]=useState(false);
  const {error,isAuthenticated}=useSelector((state)=>state.user);

  const history=useNavigate();
  const take=(e)=>{
    history('/search');
  }
  React.useEffect(()=>{
    if(error){
      window.alert(error);
      dispatch(clearErrors());
    }
    store.dispatch(loadUser());
  },[dispatch,error]);
  return (
    <header name="head">

      <a href='https://google.com' className='logo'>MUSCLE FUEL PRO</a>
      <div className='group'>
        <ul className={show ? " jind ": "hide "} name="navigation">
          <li><a href='/' >Home</a></li>
          <li><a href='/allProducts'>Products</a></li>
          <li><a href='/aboutus'>About us</a></li>
          <li><a href='/contact'>Contact</a></li>
        </ul>
        <Link to='/cart'>
        <ShoppingCartIcon style={{marginRight:'1vmax',cursor:'pointer'}} />
        </Link>
        <div className='circle'>
          { isAuthenticated?<p></p>: <Button/>}
        </div>
         
        <div  className='search' style={{zIndex:"8"}}>
          <span className='icon' style={{zIndex:"8"}}>
            <SearchIcon onClick={take} style={{zIndex:"8"}}/>
            <MenuIcon className='menuToggle' style={{zIndex:"8"}} onClick={()=>setShow(!show)} name="menu-toggle" />
            {/* <CloseIcon className='closeBtn' name='close-outline' /> */}
          </span>
        </div>
      </div>
      
    </header>
  )
}

export default Navbar;