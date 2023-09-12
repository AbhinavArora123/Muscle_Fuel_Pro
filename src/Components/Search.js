import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Search.css';
import MetaData from './MetaData';
function Search() {
    const history=useNavigate();
    const [keyword,setKeyword]=useState("");
 
    // const searchSubmitHandler=(e)=>{
    //     e.preventDefault();
    //     if(keyword.trim()){
    //         history(`/allProducts/${keyword}`);
    //     }
    //     else{
    //         history("/allProducts");
    //     }
    // };

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          history(`/allProducts/${keyword}`);
        } else {
          history("/allProducts");
        }
      };
  return (
    <Fragment>
    <MetaData title={`Search--MUSCLE FUEL PRO`} />
        {/* <form className='searchbox' onSubmit={searchSubmitHandler} >
            <input type='text' placeholder='Search a Product' onChange={(e)=>setKeyword(e.target.value)} />
            <input type='submit' value="Search" />
        </form> */}
        <form className="searchbox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search