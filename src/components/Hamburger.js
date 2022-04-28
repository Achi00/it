import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import gsap from 'gsap'

import design from '../images/design.jpeg'
import engineer from '../images/engineer.jpg'
import operate from '../images/operate.jpg'
import optimize from '../images/optimize.jpg'

const services = [
  {name: 'Design', image: design},
  {name: 'Engineer', image: engineer},
  {name: 'Operate', image: operate},
  {name: 'Optimaze', image: optimize}
]

const Hamburger = ({state}) => {
//  vars for animated dom nodes
    let menu = useRef(null)
    let revealMenu = useRef(null)
    let revealMenuBg = useRef(null)
    let cityBg = useRef(null)
    let line1 = useRef(null)
    let line2 = useRef(null)
    let line3 = useRef(null)
    let info = useRef(null)

  useEffect(() => {
    if (state.clicked === false) {
      // close menu
      gsap.to([revealMenu, revealMenuBg],{
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger:{
          amount: 0.07
        }
      })
      gsap.to(menu, {
        duration: 1,
        css: { display: "none"}
      })
    }
    else if (
      state.clicked === true || 
      (state.clicked === true && 
      state.initial === null))
    {
      // open menu
      gsap.to(menu, {
        duration: 0,
        css: { display: "block"}
      })
      gsap.to([revealMenuBg, revealMenu], {
        duration: 0,
        opacity: 1,
        height: "100%"
      })
      staggerReveal(revealMenuBg, revealMenu)
      fadeInUp(info)
      staggerText(line1, line2)
    }
  }, [state])

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: "right top",
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.1
      }
    })
  }
  const staggerText = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      y: 100, 
      delay: 0.2,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.3
      }
    })
  }
  const fadeInUp = node => {
    gsap.from(node, {
      y: 60,
      duration: 1, 
      delay: 0.2,
      opacity: 0,
      ease: "power3.inOut"
    })
  }

  const handleServices = services => {
    gsap.to(cityBg, {
      duration: 0,
      background: `url(${services}) center center`
    })
    gsap.to(cityBg, {
      duration: 0.4,
      opacity: 1,
      ease: "power3.inOut"
    })
    gsap.from(cityBg, {
      duration: 0.4,
      // skewY: 2,
      transformOrigin: "right top"
    })
  }

  const handleServicesReturn = () => {
    gsap.to(cityBg, {
      duration: 0.4,
      opacity: 1
    })
  }

  const handleHover = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 10,
      ease: "power1.inOut"
    });
  }
  const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      // opacity: 0,
      ease: "power1.inOut"
    });
  }

  return (
  <div ref={el => (menu = el)} className='hamburger-menu'>
    <div ref={el => (revealMenuBg = el)} className="menu-secondary-bg-color"></div>
    <div ref={el => (revealMenu = el)} className="menu-layer">
      <div ref={el => (cityBg = el)} className="menu-city-bg">
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li><Link
                  onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)}
                  ref={el => (line1 = el)} to="/">Home</Link></li>
                </ul>
                <ul>
                  <li><Link
                  onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)}
                  ref={el => (line2 = el)} to="/about">About</Link></li>
                </ul>               
              </nav>
              <div ref={el => (info = el)} className="info">
                <h3>Our Projects</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, dicta.</p>
              </div>
              <div className="locations">
                Services:
                {services.map(el => (
                  <span key={el.name} onMouseEnter={() => handleServices(el.image)} onMouseOut={() => handleServicesReturn}>
                    {el.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Hamburger;
