import React, { createContext, useState, useEffect } from "react"

export const GlobalContext = createContext() 

const GlobalContextData = (props) => {
    //All the states comes here.
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(false)
    const [jobs, setJobs] = useState(null)
    const [countJobs, setCountJobs] = useState(10)


    async function fetchJobs() {

        if (jobs) {
            // Data is already there in the state so no need to fetch it again.
        }
        else {
            const url = `https://jobicy.p.rapidapi.com/api/v2/remote-jobs?count=${countJobs}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '657991dd92msh28f9aa272d2d394p175c5ajsnf693f8cb86b9', 
                    'X-RapidAPI-Host': 'jobicy.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                const remotejobs = await result.jobs
                await setJobs(remotejobs)
                setCountJobs(countJobs + 10)

            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <GlobalContext.Provider value={{ jobs, setJobs, user, setUser, loading, setLoading, countJobs, setCountJobs }}>
            {props.children}
        </GlobalContext.Provider>
    )
}


export default GlobalContextData 


// import React, { useState, createContext } from 'react'
// import axios from "axios"

// export const GlobalContext = createContext() 

// const GlobalContextData = (props) => {

//    const [user, setUser] = useState(false)
//    const [jobs, setJobs] = useState(false)

//     return (
//         <GlobalContext.Provider value={{user, setUser,jobs, setJobs}}>
//             {props.children}
//         </GlobalContext.Provider>
//     )
// }

// export default GlobalContextData




// import React, { useState, createContext } from 'react';
// import axios from "axios";

// export const GlobalContext = createContext();

// const GlobalContextProvider = ({ children }) => {
//     const [user, setUser] = useState(null); // Initialize user state with null
//     const [jobs, setJobs] = useState([]); // Initialize jobs state with an empty array

//     return (
//         <GlobalContext.Provider value={{ user, setUser, jobs, setJobs }}>
//             {children}
//         </GlobalContext.Provider>
//     );
// };

// export default GlobalContextProvider;
