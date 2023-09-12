import React, { Fragment, useEffect } from 'react';
import './ProductList.css';
import './Dashboard.css';
import {useDispatch,useSelector} from 'react-redux';
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from './MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, getAdminProducts,deleteProduct } from '../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../constants/productConstants';


function ProductList() {
  const dispatch=useDispatch();
  const history=useNavigate();
  
  const {error,products}=useSelector((state)=>state.products);

  const {error:deleteError,isDeleted}=useSelector((state)=>state.product);

  const deleteProductHandler=(id)=>{
    dispatch(deleteProduct(id));
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
      window.alert("Product Deleted Successfully");
      history('/admin/dashboard');
      dispatch({type:DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProducts());
  },[dispatch,error,deleteError,isDeleted,history]);

  const columns=[
    {field:'id',headerName:"Product ID",minWidth:200,flex:0.5},
    {
      field:"name",
      headerName:"Name",
      minWidth:250,
      flex:1,
    },
    
    {
      field:"stock",
      headerName:"Stock",
      type:'number',
      minWidth:150,
      flex:0.3
    },
    {
      field:"price",
      headerName:"Price",
      type:'number',
      minWidth:270,
      flex:0.5
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
            <Link to={`/admin/product/${params.id}`} >
            <EditIcon/>
            </Link>

            <Button onClick={()=>deleteProductHandler(params.id)}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    },  
  ]

  const rows=[];

  products && 
  products.forEach((item)=>{
    rows.push({
      id:item._id,
      stock:item.Stock,
      price:item.price,
      name:item.name
    })
  });

  return (
    <Fragment>
    <MetaData title="ALL PRODUCTS-ADMIN" />
    <div className='dashboard' >
    <Sidebar/>
    <div className='productListContainer' >
    <h1 id='productListHeading' >ALL PRODUCTS</h1>
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

export default ProductList