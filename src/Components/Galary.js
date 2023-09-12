
// import React from 'react';
// import {
//   MDBCarousel,
//   MDBCarouselItem,
// } from 'mdb-react-ui-kit';

// export default function Galary() {
//   return (
//     <MDBCarousel showControls style={{cursor:'pointer',opacity:'5',margin:'0', padding:'0',boxSizing:'border-box',objectFit:'fill',height:'100vh',left:'0'}}>
//       <MDBCarouselItem style={{height:'100vh',width:'200vw'}}
//         className='w-100 d-block'
//         itemId={1}
//         src='https://cdn.shopify.com/s/files/1/0599/9693/0285/files/banner_3_2048x664.png?v=1662878885'
//         alt='...'
//       />
//       <MDBCarouselItem style={{height:'100vh',width:'100vw'}}
//         className='w-100 d-block'
//         itemId={2}
//         src='https://cdn.shopify.com/s/files/1/0599/9693/0285/files/banner_4_2048x664.png?v=1662882764'
//         alt='...'
//       />
//       <MDBCarouselItem style={{height:'100vh',width:'150%'}}
//         className='w-100 d-block'
//         itemId={3}
//         src='https://daretosupplements.com/cdn/shop/files/banner_1_1_2048x664.png?v=1662883960'
//         alt='...'
//       />
//     </MDBCarousel>
//   );
// }

// import { Carousel } from 'react-carousel-minimal';

// function Galary() {
//  const data = [
//     {
//       image: "https://cdn.shopify.com/s/files/1/0599/9693/0285/files/banner_3_2048x664.png?v=1662878885",
//       caption: ""
//     },
//     {
//       image: "https://cdn.shopify.com/s/files/1/0599/9693/0285/files/banner_4_2048x664.png?v=1662882764",
//       caption: ""
//     },
//     {
//       image: "https://daretosupplements.com/cdn/shop/files/banner_1_1_2048x664.png?v=1662883960",
//       caption: ""
//     },
//   ];

//   const captionStyle = {
//     fontSize: '2em',
//     fontWeight: 'bold',
//   }
//   const slideNumberStyle = {
//     fontSize: '20px',
//     fontWeight: 'bold',
//   }
//   return (
//     <div className="App">
//       <div style={{ textAlign: "center" }}>
//         {/* <h2>React Carousel Minimal</h2>
//         <p>Easy to use, responsive and customizable carousel component for React Projects.</p> */}
//         <div style={{
//           padding: "0", marginTop:'0',cursor:'pointer'
//         }}>
//           <Carousel
//             data={data}
//             time={2000}
//             width="100vw"
//             height="60vh"
//             transition='smooth'
            
//             captionStyle={captionStyle}
//             // radius="10px"
//             // slideNumber={true}
//             slideNumberStyle={slideNumberStyle}
//             // captionPosition="bottom"
//             automatic={true}
//             dots={true}
//             pauseIconColor="white"
//             pauseIconSize="40px"
//             // slideBackgroundColor="darkgrey"
//             slideImageFit="cover"
//             // thumbnails={true}
//             thumbnailWidth="100px"
//             style={{
//               textAlign: "center",
//               maxWidth: "100vw",
//               maxHeight: "500px",
//               margin: "40px auto",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
//   export default Galary;

// import React,{useState} from 'react';

// const slideStyles = {
//   width: "100%",
//   height: "100%",
//   borderRadius: "10px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// };

// const rightArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   right: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const leftArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   left: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const sliderStyles = {
//   position: "relative",
//   height: "100%",
// };

// const dotsContainerStyles = {
//   display: "flex",
//   justifyContent: "center",
// };

// const dotStyle = {
//   margin: "0 3px",
//   cursor: "pointer",
//   fontSize: "20px",
// };

// const Galary3 = ({ slides }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const goToPrevious = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };
//   const goToNext = () => {
//     const isLastSlide = currentIndex === slides.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };
//   const goToSlide = (slideIndex) => {
//     setCurrentIndex(slideIndex);
//   };
//   const slideStylesWidthBackground = {
//     ...slideStyles,
//     // backgroundImage: `url(${slides[currentIndex].url})`,
//     backgroundImage: `url('https://daretosupplements.com/cdn/shop/files/banner_1_1_2048x664.png?v=1662883960')`,
//   };

//   return (
//     <div style={sliderStyles}>
//       <div>
//         <div onClick={goToPrevious} style={leftArrowStyles}>
//           ❰
//         </div>
//         <div onClick={goToNext} style={rightArrowStyles}>
//           ❱
//         </div>
//       </div>
//       <div style={slideStylesWidthBackground}></div>
//       <div style={dotsContainerStyles}>
//         {slides.map((slide, slideIndex) => (
//           <div
//             style={dotStyle}
//             key={slideIndex}
//             onClick={() => goToSlide(slideIndex)}
//           >
//             ●
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Galary3;

import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';
// import Item from './Item';


const slider=[
  {
    "id":1,
    "image":"https://daretosupplements.com/cdn/shop/files/banner_1_1_2048x664.png?v=1662883960"
  },
  {
    "id":2,
    "image":"https://cdn.shopify.com/s/files/1/0599/9693/0285/files/banner_4_2048x664.png?v=1662882764"
  },
  {
    "id":3,
    "image":"https://cdn.shopify.com/s/files/1/0599/9693/0285/files/banner_3_2048x664.png?v=1662878885"
  }
]

function Galary() {

  return (

    <Carousel 
      autoPlay='true'
      interval='7000'
    >
      {
        slider.map(item=><Link to='/allProducts'><img key={item.id} src={item.image} alt={item.id} style={{height:'70vh',width:'100%'}} /></Link>)
      }
    </Carousel>
    
  )
}

export default Galary;