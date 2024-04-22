import React from 'react'
import LoadingScreen from "../assets/loadingscreen.gif"

function Loading() {
    return (
        <div className="loading-screen-container">
         <img src={LoadingScreen} />
        </div>
    )
}

export default Loading