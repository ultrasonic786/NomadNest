import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div className="gutt">

    <div className="nav-bar-container">
        <div className="nav-bar-logo-container">
            <Link to="/">NomadNest</Link>
        </div>
    </div>
    </div>
  )
}

export default Navbar