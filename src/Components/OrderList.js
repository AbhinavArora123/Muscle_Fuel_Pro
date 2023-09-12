import React, { Fragment, useEffect } from 'react';
import './OrderList.css';
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
import { deleteOrder, getAllOrders,clearErrors } from '../actions/orderActions';
import { DELETE_ORDER_RESET } from '../constants/orderConstants';


function OrderList() {
  const dispatch=useDispatch();
  const history=useNavigate();
  
  const {error,orders}=useSelector((state)=>state.allOrders);
  // const {order} =useSelector((state)=>state.orderDetails);

  const {error:deleteError,isDeleted}=useSelector((state)=>state.order);

  const deleteOrderHandler=(id)=>{
    dispatch(deleteOrder(id));
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
      window.alert("Order Deleted Successfully");
      history('/admin/orders');
      dispatch({type:DELETE_ORDER_RESET});
    }
    dispatch(getAllOrders());
  },[dispatch,error,deleteError,isDeleted,history]);

  const columns=[
    {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            // cellClassName:"redColor"
            cellClassName:()=>{
                if(orders.orderStatus==='Delivered'){
                    return 'greenColor';
                } else{
                    return "redColor"
                }
                
                  // return orders.orderStatus && orders.orderStatus === "Delivered"
                  //   ? "greenColor"
                  //   : "redColor"
                
            }
            
            
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:0.3
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:150,
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
            <Link to={`/admin/order/${params.id}`} >
            <EditIcon/>
            </Link>

            <Button onClick={()=>deleteOrderHandler(params.id)}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    },  
  ]

  const rows=[];

  orders && 
  orders.forEach((item)=>{
    rows.push({
      id:item._id,
      itemsQty:item.orderItems.length,
      amount:item.totalPrice,
      status:item.orderStatus
    })
  });

  return (
    <Fragment>
    <MetaData title="ALL ORDERS-ADMIN" />
    <div className='dashboard' >
    <Sidebar/>
    <div className='productListContainer' >
    <h1 id='productListHeading' >ALL ORDERS</h1>
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

export default OrderList