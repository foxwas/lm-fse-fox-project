import React, { useState } from 'react';



export function Articles(params) { 

  const [showDetails, setShowDetails] = useState(false);
  let articles = (params.data.articles)?params.data.articles:[];
  let queryName = (params.query.queryName)?params.query.queryName:"na";
  let articleCount = (params.data.totalResults)?params.data.totalResults:0;

  function getQueryDetails(query) {
    let details = (
      <div className='articlesList'>
        <h3 className="query-details">Query Details:</h3>
        <ul>
          <li>Query Name: {queryName}</li>
          <li>Query Text: {query.q}</li>
          <li>Language: {query.language}</li>
          <li>Total articles: {articleCount}</li> 
          <li>Maxium showing: {query.pageSize} </li>
        </ul>
      </div>
    )
    return details;
  }


  return (
    <div> 
      <button className="btn third" onClick={() => setShowDetails(!showDetails)}> Query Details</button> {/* Button to toggle details */}

      <div className="query-details-contents">{showDetails && getQueryDetails(params.query)}</div> {/* Render details if showDetails is true */}
      <ol>
        <div className="article-list">
        {articles.map((item, idx) => {
          if (item && item.title) {
            if (item.title === "[Removed]") {
              return <li key={idx}>Was Removed</li>;
            } else {
              let trimTitle = item.title.substring(0, 300);
              return (
                <li key={idx}>
                  <a href={item.url} target="_self" rel="noreferrer">
                  {trimTitle}
                  < br/>
                  </a>
                  < br/>
                </li>
              );
            }
          } else {
            return <li key={idx}>No Title</li>;
          }
        })}
        </div>
      </ol>
    </div>
  );
}