import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate as Redirect } from 'react-router-dom';


// function ProtectedRoute({component:Component,...rest}) {
// function ProtectedRoute({component:Component,...rest}) {
//     const {loading , isAuthenticated,user}=useSelector((state)=>state.user)
//   return (
//     // <Fragment>
//     //     {!loading && (
//     //         <Route
//     //             {...rest}
//     //             render={(props)=>{
//     //                 if(!isAuthenticated){
//     //                     return <Redirect to ='/signup'/>;
//     //                 }
//     //                 return <Component {...props}/>
//     //             }}
//     //         />
//     //     )}
//     // </Fragment>
//     isAuthenticated? <Outlet/> : <Redirect to='/signup'/>
//   )
// }


const ProtectedRoute = ({
    isAdmin,
    redirectPath = '/signup',
    children,
  }) => {
    const { isAuthenticated,user}=useSelector((state)=>state.user)
    if (!isAuthenticated) {
      return <Redirect to={redirectPath} />;
    }
    if(isAdmin===true && user.role!=='admin'){
      return <Redirect to={redirectPath} />;
    }
  
    return children;
  };

export default ProtectedRoute