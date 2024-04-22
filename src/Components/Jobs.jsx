


import React, { useContext, useState } from "react";
import { GlobalContext } from '../Context/GlobalContext';

import PushPin from "../assets/push-pin.png";
import Money from "../assets/money.png";
import Loading from "../Pages/Loading";
import { useNavigate } from "react-router-dom";

function Jobs() {
    const globalContextItems = useContext(GlobalContext);

    const [query, setQuery] = useState()
    const navigate = useNavigate()

    function handleChange(event) {
        setQuery(event.target.value)
        console.log(event.target.value)
    }

    async function fetchMoreJobs() {
        globalContextItems.setLoading(true)
        const url = `https://jobicy.p.rapidapi.com/api/v2/remote-jobs?count=${globalContextItems.countJobs}`;
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
            await globalContextItems.setJobs(globalContextItems.jobs.concat(remotejobs));
            globalContextItems.setCountJobs(globalContextItems.countJobs + 10)
            console.log('job count', globalContextItems.countJobs)
            globalContextItems.setLoading(false)

        } catch (error) {
            globalContextItems.setLoading(false)
            console.error(error);
        }

    }

    function TransferQuery() {
        // For search box
        console.log('SEARCH BOX')
        sessionStorage.setItem('query', query)
        navigate(`/title/${query}`)
    }

    function TransferTag(e) {
        // For job title tags
        console.log('TITLE TAG')
        const query = e.target.getAttribute('data-value')
        sessionStorage.setItem('query', query)
        navigate(`/title/${query}`)
    }

    function TransferGeo(e) {
        // For geo tags
        console.log('LOCATION TAG')
        const query = e.target.getAttribute('data-geo')
        sessionStorage.setItem('query', query)
        navigate(`/location/${query}`)
    }

    return (
        <>
            <div className="gutter search-tags-gutter">
                <div className="search-tags-container">
                    <h1 className="search-tags-heading">
                        Browse remote jobs.
                    </h1>
                    <p className="search-tags-para">
                        NomadNest is where top talents go to easily access active and fully remote job opportunities from vetted tech companies.
                    </p>
                    <div className="search-tags-form-container">
                        <form className="search-tags-form" onSubmit={TransferQuery}>
                            <input type="text" placeholder="search job title" className="search-tags-form-input" value={query} onChange={handleChange}></input>
                            <span class="material-symbols-outlined">
                                search
                            </span>
                        </form>
                    </div>
                    <div className="tags-container">
                        <div className="tag-element" data-value="frontend" onClick={TransferTag}>frontend</div>
                        <div className="tag-element" data-value="backend" onClick={TransferTag}>backend</div>
                        <div className="tag-element" data-value="cloud" onClick={TransferTag}>cloud</div>
                        <div className="tag-element" data-value="devops" onClick={TransferTag}>devops</div>
                        <div className="tag-element" data-value="cyber security" onClick={TransferTag}>cyber security</div>
                        <div className="tag-element" data-geo="usa" onClick={TransferGeo}>USA</div>
                        <div className="tag-element" data-geo="europe" onClick={TransferGeo}>Europe</div>
                        <div className="tag-element" data-geo="australia" onClick={TransferGeo}>Australia</div>
                        <div className="tag-element" data-geo="canada" onClick={TransferGeo}>Canada</div>
                        <div className="tag-element" data-geo="japan" onClick={TransferGeo}>japan</div>
                    </div>
                </div>
            </div>

            {
                !globalContextItems.loading ? (

                    <div className="gutter jobs-gutter">
                        {
                            globalContextItems.jobs ?
                                (
                                    globalContextItems.jobs.map((element) => (
                                        <a href={element.url} target="_blank" className="job-cards-container">
                                            <div className="job-card-logo-container" style={{
                                                color: ["#FA7070", "#A1C398", "#E178C5", "#008DDA", "#9BCF53", "#87C4FF", "#FFB84C", "#A03C78", "#F9B208", "#28DF99", "#A8FF3E", "#FFD099", "#FFCF96"][Math.floor(Math.random() * 4)],
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "65px",
                                                fontWeight: "900"
                                            }}>{element.companyName[0]}</div>

                                            <div className="job-card-info-container">

                                                <div className="job-card-info-comp-name-post-container">
                                                    <div className="job-card-info-comp-name">
                                                        {element.companyName}
                                                    </div>
                                                    <div className="job-card-info-comp-post-spacer">|</div>
                                                    <div className="job-card-info-post-name">
                                                        {element.jobTitle}
                                                    </div>
                                                </div>
                                                <div className="job-card-info-salary-location-industry-container">
                                                    <div className="job-card-info-salary">
                                                        <img src={Money} alt="Money" />
                                                        {element.annualSalaryMax} - {element.annualSalaryMin} {element.salaryCurrency}
                                                    </div>
                                                    <div className="job-card-info-location">
                                                        <img src={PushPin} alt="Location" />
                                                        {element.jobGeo}
                                                    </div>
                                                    {element.jobIndustry.map((item, index) => (
                                                        <div className="job-card-info-industry" key={index}>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="job-card-apply-container">
                                                Apply
                                            </div>
                                        </a>
                                    ))
                                )
                                :
                                (
                                    <p>No jobs found</p>
                                )
                        }
                        {
                            globalContextItems.countJobs > 50 ?
                                <></>
                                :
                                <div className="load-more-container">
                                    <button onClick={fetchMoreJobs}>
                                        Load more
                                    </button>
                                </div>
                        }
                    </div>
                )
                    :
                    (
                        <Loading />
                    )
            }
        </>
    );
}

export default Jobs;
