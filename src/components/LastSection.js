import React, { useState } from "react";
import "./lastSection.scss"
import img1 from "./pixelImgs/pixel.png"
import img2 from "./pixelImgs/pixel1.png"
import img3 from "./pixelImgs/pixel2.png"


function LastSection() {
    return (

        <main className='app'>
          <div>      
            <div className="logo">IT.</div>
          </div>
          <div className="scanlines"></div>
           <div className="intro-wrap">
           	<div className="noise"></div>
           	<div className="noise noise-moving"></div>  
           	<div className="play" data-splitting>PLAY</div>
           	<div className="time">02:27</div>
           	<div className="recordSpeed">SLP 0:00:00</div>
               <div className="headline">
                   <h2>Hover Here</h2>
               </div>
            <div className="text">
                <h2>Design</h2>
                <h2>Development</h2>
                <h2>Architecture</h2>
            </div>

              <div className="pixel-images">
                 <img src={img1} alt="img" />
                 <img src={img2} alt="img" />
                 <img src={img3} alt="img" />
              </div>
           </div>
        </main>
    )
  
}

export default LastSection