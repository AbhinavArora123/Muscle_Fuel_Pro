import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './MyOrders.css';
import LaunchIcon from '@mui/icons-material/Launch';
import MetaData from './MetaData';
import Loader from './Loader';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../actions/orderActions';
import { Link, useParams } from 'react-router-dom';
function MyOrders() {
    const dispatch=useDispatch();
    const {status}=useParams();

    const {loading,error,orders}=useSelector((state)=>state.myOrders)
    const {user} = useSelector((state)=>state.user);

    const columns=[
        {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            // cellClassName:"redColor"
            cellClassName:()=>{
                if(status==='Delivered'){
                    return 'greenColor';
                } else{
                    return "redColor"
                }
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
            flex:0.3,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Link to={`/order/${params.id}`}><LaunchIcon/></Link>
                );
            }
        }
    ];

    const rows=[];

        orders && 
        orders.forEach((item,index)=> {
          rows.push({
            itemsQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice,
          })  
        })
    

    useEffect(()=>{
        if(error){
            window.alert(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch,error]);

  return (
    <Fragment>
        <MetaData title={`${user.name}'s Orders`} />
        {loading?<Loader/>:(
            <div className='myOrdersPage'>
            <DataGrid rows={rows} 
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='myOrdersTable'
                // autoHeight
             />
             <Typography id='myOrdersHeading' > {user.name}'s Orders</Typography>
            </div>
        )}
    </Fragment>
  )
}

export default MyOrders