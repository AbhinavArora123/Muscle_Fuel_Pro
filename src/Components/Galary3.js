import pintola from './Images/pintola.jpg'
import funfoods from './Images/funfoods.png'
import MuscleBlaze from './Images/MuscleBlaze.png'
import myfitness from './Images/myfitness.png'
import natural from './Images/natural.png'
// import sorich from './Images/sorich.png'
import sorich from './Images/sorich.png'
import wow from './Images/wow.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import React from 'react'
import './Galary3.css';
// import Slider from "react-slick";
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom';
// import Button1 from './Button1';



import React, { useState } from "react";
import Slider from "react-slick";
import { Button1 } from './Button1'

const images = [pintola, funfoods, wow, natural, sorich, myfitness, MuscleBlaze];
const prod = ["hello", "hello1", "hello2", "hello3", "hello4", "hello5", "hello6"]
const id=['6494f16322fa3e9c6adea2a1','64af91eb57ecdf0eb96db6b6','64aebf00eb864ddcf16ab579','64ae67454b7100d3c2ddfc87','64aeb55f6cb7d885df6708fb','64ae68054b7100d3c2ddfce5','64ae6029ba232f2216cf8c49'];

function SampleNextArrow({ onClick }) {
  return (
    <div className="arrow arrow-right">
      <BsArrowRight onClick={onClick} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="arrow arrow-left">
      <BsArrowLeft onClick={onClick} />
    </div>
  );
}

function Galary3() {
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    beforeChange: (current, next) => setSlideIndex(next),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay:true,
    // autoplaySpeed:7000
  };
  return (
    <div className='container-1'>
      <h2 className='header'>Most Sold Products</h2>
      <h5 style={{marginBottom:'2vmax'}}>100% Guarantee of Authentication</h5>
      <div className='slider'>
        <Slider {...settings} style={{zIndex:"8"}}>
          {
            images.map((img, index) => (
              <div className={index === slideIndex ? 'slide slide-active' : 'slide'} key={img}>
                <Link to={`/product/${id[index]}`}>
                  <img src={img} alt='' />
                </Link>
                {
                  function help() {
                    for (let i in images) {
                      let p = document.createElement('h3');
                      p.innerHTML = prod[i];
                    }
                  }
                }
                <p><help /></p>

              </div>
            ))
          }
        </Slider>
        <div className='button-slider'>
        <Button1/>
        </div>
      </div>
    </div>
  )
}

export default Galary3