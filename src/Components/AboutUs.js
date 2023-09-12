import React from "react";
import "./AboutSection.css";
import {  Button, Typography } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from './Images/logo.png';

const AboutUs = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">ABOUT US</Typography>

        <div>
          <div>
            <img
              style={{ width: "10vmax", height: "10vmax", objectFit:'contain',borderRadius:'100px',boxShadow:'0 2px 0 2px lightgray',margin:'4px'}}
              src={logo}
              alt="Founder"
            />
            <Typography>MUSCLE FUEL PRO</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            Muscle Fuel Pro is a leading online platform that offers a wide range of high-quality gym supplements. Muscle Fuel Pro offers a comprehensive range of supplements to cater to your specific needs.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2" style={{fontWeight:'400'}}>OUR BRANDS</Typography>
            <a
              href="https://www.youtube.com"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;