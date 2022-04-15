import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter, Link, withRouter} from "react-router-dom";
import Hamburger from "./Hamburger"

const Header = ({history, timeline}) => {
  //load animation 
  let logo = useRef(null)
  let menu = useRef(null)
  useEffect(()=> {
    timeline.from(logo,{
        delay: .5,
        duration: 1,
        opacity: 0,
        y: 100
    })
    timeline.from(menu,{
      delay: .7,
        duration: 1,
        opacity: 0,
        y: 100
    },"-=.3")
})

  // state for menu
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu"
  })


// state for disabled button
  const [disabled, setDisabled] = useState(false)
  // use effect for page changes
  useEffect(() => {
    //listen to page changes
    history.listen(() => {
      setState({clicked: false, menuName: "Menu"})
    })
  })

   const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close"
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: "Menu"
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: "Close"
      });
    }
  }

// determine if our menu button should be disabled
const disableMenu = () => {
  setDisabled(!disabled)
  setTimeout(() => {
    setDisabled(false)
  }, 1200)
}

  return <header>
    <div className="container">
      <div className="wrapper">
        <div className="inner-header">
          <div className="logo" ref={el => logo = el}>
            <Link to="/">IT.</Link>
          </div>
          <div className="menu">
            <button disabled={disabled} onClick={handleMenu}>
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
    <Hamburger state={state}/>
  </header>;
};

export default withRouter(Header);
