import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div className="gutt">

    <div className="nav-bar-container">
        <div className="nav-bar-logo-container">
            <Link to="/">NomadNest</Link>
        </div>
        {/* <div className="nav-bar-links-container">
            <div className="nav-bar-link">
                <a className="nav-bar-link-login" href="">Log in</a>
            </div>
            <div className="nav-bar-link">
                <a className="nav-bar-link-start" href=''>Start</a>
            </div>
        </div> */}
    </div>
    </div>
  )
}

export default Navbar