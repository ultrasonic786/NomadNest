


import React, { useContext } from "react";
import { GlobalContext } from '../Context/GlobalContext';
// import { Link } from 'react-router-dom';
import PushPin from "../assets/push-pin.png";
import Money from "../assets/money.png";

function Jobs() {
    const globalContextItems = useContext(GlobalContext);

    return (
        <div className="gutter jobs-gutter">
            {
                globalContextItems.jobs ?
                    (
                        globalContextItems.jobs.map((element) => (
                            <a href={element.url} target="_blank" className="job-cards-container">

                                <div className="job-card-logo-container" style={{
                                    color: ["#FA7070","#A1C398", "#E178C5", "#008DDA", "#9BCF53", "#87C4FF","#FFB84C","#A03C78","#F9B208","#28DF99","#A8FF3E","#FFD099","FFCF96"][Math.floor(Math.random() * 4)],
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
                        <p>Jobs loading</p>
                    )
            }
        </div>
    );
}

export default Jobs;
