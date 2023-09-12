import React, { Fragment, useEffect } from 'react';
import './ProductList.css';
import './Dashboard.css';
import {useDispatch,useSelector} from 'react-redux';
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from './MetaData';
import { DataGrid } from '@mui/x-data-grid';
import {clearErrors, deleteUser, getAllUsers } from '../actions/userAction';
import { DELETE_USER_RESET } from '../constants/userConstants';


function UserList() {
  const dispatch=useDispatch();
  const history=useNavigate();
  
  const {error,users}=useSelector((state)=>state.allUsers);

  const {error:deleteError,isDeleted,message}=useSelector((state)=>state.profile);
 
  const deleteUserHandler=(id)=>{
    dispatch(deleteUser(id));
  }

  useEffect(()=>{
    if(error){
      window.alert(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      window.alert(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      window.alert(message);
      history('/admin/users');
      dispatch({type:DELETE_USER_RESET});
    }
    dispatch(getAllUsers());
  },[dispatch,error,deleteError,isDeleted,history,message]);

  const columns=[
    {field:'id',headerName:"User ID",minWidth:200,flex:0.8},
    {
      field:"email",
      headerName:"email",
      minWidth:250,
      flex:1,
    },
    
    {
      field:"name",
      headerName:"Name",
      type:'number',
      minWidth:150,
      flex:0.5
    },
    {
      field:"role",
      headerName:"Role",
      type:'number',
      minWidth:150,
      flex:0.3,
      cellClassName:'greenColor'
      // cellClassName:(params)=>{
      //   return params.role==='admin'?"greenColor":"redColor";
      // }
    },
    {
      field:"actions",
      headerName:"Actions",
      type:'number',
      minWidth:150,
      flex:0.3,
      sortable:false,
      renderCell:(params)=>{
        return(
          <Fragment>
            <Link to={`/admin/user/${params.id}`} >
            <EditIcon/>
            </Link>

            <Button onClick={()=>deleteUserHandler(params.id)}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    },  
  ]

  const rows=[];

  users && 
  users.forEach((item)=>{
    rows.push({
      id:item._id,
      role:item.role,
      email:item.email,
      name:item.name
    })
  });

  return (
    <Fragment>
    <MetaData title="ALL USERS-ADMIN" />
    <div className='dashboard' >
    <Sidebar/>
    <div className='productListContainer' >
    <h1 id='productListHeading' >ALL USERS</h1>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={20}
      disableSelectionOnClick
      className="productListTable"
      // autoHeight
    />
    </div>
    </div>
    </Fragment>
  )
}

export default UserList;