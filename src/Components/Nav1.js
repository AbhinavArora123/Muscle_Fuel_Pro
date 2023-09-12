import React from 'react';
import './Nav1.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// import { Link } from 'react-router-dom';

function Nav1() {
  return (
    <header className='nav1'>
    <div style={{left:'0',alignContent:'center',alignItems:'center',display:'flex',marginBottom:'7px'}}>
    {/* <Link to='youtube.com'>
    <YouTubeIcon style={{cursor:'pointer',color:'rgb(215, 215, 215)'}} />
    </Link>
    <Link to='instagram.com'>
    <InstagramIcon style={{cursor:'pointer',color:'rgb(215, 215, 215)'}}/>
    </Link> */}
    <a
              href="https://www.youtube.com"
              target="blank"
            >
              <YouTubeIcon style={{color:'rgb(215, 215, 215)'}} className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com" target="blank">
              <InstagramIcon style={{color:'rgb(215, 215, 215)'}} className="instagramSvgIcon" />
            </a>
    </div>
    <div>
        <p style={{marginRight:'5px',marginTop:'7px'}}>Free shipping on prepaid orders | 7-Day free returns</p>
    </div>
    </header>
  )
}

export default Nav1