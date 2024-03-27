import React from 'react'

function Search_Tags() {
    function fetchJobs() {

    }
    return (
        <div className="gutter search-tags-gutter">
            <div className="search-tags-container">
                <h1 className="search-tags-heading">
                    Browse remote jobs.
                </h1>
                <p className="search-tags-para">
                    Remotive is where top talents go to easily access active and fully remote job opportunities from vetted tech companies.
                </p>
                <div className="search-tags-form-container">
                    <form className="search-tags-form">
                        <input type="text" placeholder="search something" className="search-tags-form-input"></input>
                        <span class="material-symbols-outlined">
                            search
                        </span>
                    </form>
                </div>
                <div className="tags-container">
                    <div className="tag-element">frontend</div>
                    <div className="tag-element">backend</div>
                    <div className="tag-element">cloud</div>
                    <div className="tag-element">devops</div>
                    <div className="tag-element">cyber security</div>
                    <div className="tag-element">Product</div>
                    <div className="tag-element">Design</div>
                    <div className="tag-element">Marketing</div>
                    <div className="tag-element">Finance</div>
                    <div className="tag-element">Writing</div>
                </div>
            </div>
        </div>
    )
}

export default Search_Tags