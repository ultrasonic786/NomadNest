import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext';
import Loading from '../Pages/Loading';
import PushPin from "../assets/push-pin.png";
import Money from "../assets/money.png";
import { Link } from 'react-router-dom';

function SearchLocationResults() {
  const globalContextItems = useContext(GlobalContext)

  async function fetchSearchTag() {
    globalContextItems.setLoading(true)

    // Abort essentials
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Setting timer for aborting
    const timeoutId = setTimeout(() => {
      abortController.abort(); // Abort the fetch request after 10 seconds
      globalContextItems.setLoading(false);
      console.log('Fetch request aborted after 10 seconds.');
    }, 10000)

    // setting basic parameters as it is the first fetch request (useEffect)
    // globalContextItems.setSearchTagCount(10)
    const query = sessionStorage.getItem('query')

    const url = `https://jobicy.p.rapidapi.com/api/v2/remote-jobs?count=50&geo=${query}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '657991dd92msh28f9aa272d2d394p175c5ajsnf693f8cb86b9',
		'X-RapidAPI-Host': 'jobicy.p.rapidapi.com'
	},
    signal
};

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId) // If no response after 10seconds then this will be fired immediately and it will abort the request.
      const result = await response.json();
      const remotejobs = await result.jobs
      console.log('results: ', result)
      globalContextItems.setGeoResults(remotejobs);
      // globalContextItems.setSearchTagCount(globalContextItems.searchTagCount + 10)
      globalContextItems.setLoading(false)
      console.log('count', globalContextItems.searchTagCount)
    } catch (error) {
      globalContextItems.setLoading(false)
      console.error(error);
    }
  }

  async function fetchMoreSearchTag() {
    globalContextItems.setLoading(true)
    const query = sessionStorage.getItem('query')
    const url = `https://jobicy.p.rapidapi.com/api/v2/remote-jobs?count=50&geo=${query}`;
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
      console.log('results: ', result)
      globalContextItems.setSearchTagResults(remotejobs);
      // globalContextItems.setSearchTagCount(globalContextItems.searchTagCount + 10)
      globalContextItems.setLoading(false)
      console.log('count', globalContextItems.searchTagCount)

    } catch (error) {
      globalContextItems.setLoading(false)
      console.error(error);
    }
  }
  useEffect(() => {
    fetchSearchTag()
  }, [])
  return (
    <div>
      {
        !globalContextItems.loading ? (
          <div className="gutter jobs-gutter">
            <div className="show-results-back-btn-container">
              <div className="back-btn-container">
                <Link to="/"><span class="material-symbols-outlined">arrow_back</span> Back</Link>
              </div>
              <div className="show-results-for-container">
                Showing results for <span style={{ fontWeight: "700", fontSize: "20px" }}>"{sessionStorage.getItem('query')}"</span>
              </div>
            </div>
            {
              globalContextItems.geoResults.length > 0 ?
                (
                  globalContextItems.geoResults.map((element) => (
                    <a href={element.url} target="_blank" className="job-cards-container">

                      <div className="job-card-logo-container" style={{
                        color: ["#FA7070", "#A1C398", "#E178C5", "#008DDA", "#9BCF53", "#87C4FF", "#FFB84C", "#A03C78", "#F9B208", "#28DF99", "#A8FF3E", "#FFD099", "FFCF96"][Math.floor(Math.random() * 4)],
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
                  <>
                    <p style={{ textAlign: 'center' }}>No jobs found</p>
                  </>
                )
            }
          </div>
        )
          :
          (
            <Loading />
          )
      }
    </div>
  )
}

export default SearchLocationResults