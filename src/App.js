import React, { useEffect } from 'react';
import './App.css';
import FixedImages from './Components/FixedImages';
import Footer from './Components/Footer';
import Galary3 from './Components/Galary3';
import Navbar from './Components/Navbar';
// import GoToTop from './Components/GoToTop';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProducts from './Components/AllProducts';
import ProductDetails from './Components/ProductDetails';
import Search from './Components/Search';
import Signup from './Components/Signup';
import store from './store';
import {loadUser} from './actions/userAction';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import UpdateProfile from './Components/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Cart from './Components/Cart';
import Shipping from './Components/Shipping';
import ConfirmOrder from './Components/ConfirmOrder';
// import axios from 'axios';
import Payment from './Components/Payment';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './Components/OrderSuccess';
import MyOrders from './Components/MyOrders';
import OrderDetails from './Components/OrderDetails.js';
import Galary from './Components/Galary';
import { useSelector } from 'react-redux';
import UserOptions from './Components/UserOptions';
import Dashboard from './Components/Dashboard.js';
import ProductList from './Components/ProductList';
import NewProduct from './Components/NewProduct';
import UpdateProduct from './Components/UpdateProduct';
import OrderList from './Components/OrderList';
import ProcessOrder from './Components/ProcessOrder';
import UsersList from './Components/UsersList';
import UpdateUser from './Components/UpdateUser';
import ProductReviews from './Components/ProductReviews';
import Contact from './Components/Conatct';
import AboutUs from './Components/AboutUs';
import FixedImages2 from './Components/FixedImages2';
import Nav1 from './Components/Nav1';
import Galary4 from './Components/Galary4';

function App(){

  const {isAuthenticated,user}=useSelector((state)=>state.user);
  // const [stripeApiKey,setStripeApiKey]=useState("");

  // async function getStripeApiKey(){
  //   const {data} =await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  const stripeApiKey='pk_test_51NR6vqSHQOCQaXaP8j36kH9KXghRytPaz4VD9z79ZkdwCGLmr1pYO7RLYvlFBGgpaMyTj738OOkuEOqGrrbwdTI5007MFKzEWa'
  useEffect(()=>{
    store.dispatch(loadUser());
    // getStripeApiKey();
  },[]);
  console.log(stripeApiKey);
  return (
    <Router>
    {/* <GoToTop/> */}
      <Nav1/>
      <Navbar/>
      {isAuthenticated &&   <UserOptions user={user} />}
      <Routes>
        
        <Route  path="/" element={[<Galary/>,<Galary3/>,<FixedImages2/>,<Galary4/>]} />
        <Route path='/allProducts' element={[<AllProducts/>]}/>
        <Route path='/contact' element={[<Contact/>]}/>
        <Route path='/aboutus' element={[<AboutUs/>]}/>
        <Route path='/product/:id' element={[<ProductDetails/>]}/>
        <Route path='/password/forgot' element={[<ForgotPassword/>]} />
        {/* <Route path='/admin/product' element={[<NewProduct/>]} /> */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/forgot"
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true} >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true} >
              <ProductList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true} >
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true} >
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true} >
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true} >
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true} >
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true} >
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} >
              <ProductReviews />
            </ProtectedRoute>
          }
        />

       { stripeApiKey && 
        <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
            </Elements>
          }
        />
       }
        <Route path='/password/reset/:token' element={[<ResetPassword />]} />
        <Route path='/allProducts/:keyword' element={[<AllProducts/>]}/>
        <Route exact path='/search' element={[<Search/>]}/>
        <Route path='/signup' element={[<Signup/>]}/>
        <Route path='/cart' element={[<Cart/>]}/>
      </Routes>
      <FixedImages/>
      <Footer/>
      {/* <GoToTop/> */}
    </Router>
  );
};

export default App;