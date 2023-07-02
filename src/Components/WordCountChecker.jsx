import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import 'bootstrap/dist/css/bootstrap.min.css'; 

const WordCountChecker = () => {
  const [url, setUrl] = useState('');
  const [wordCount, setWordCount] = useState(null);
  const [wordCountData, setWordCountData] = useState([]);

  useEffect(() => {
    retrieveWordCountData();
  }, []);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleWordCountCheck = () => {
    axios
      .post('http://localhost:5000/word-count', { url })
      .then(() => {
        retrieveWordCountData();
      })
      .catch((error) => {
        console.error('Error checking word count:', error);
      });
  };

  const retrieveWordCountData = () => {
    axios.get('http://localhost:5000/word-counts')
      .then((response) => {
        setWordCountData(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving word count data:', error);
      });
  };

  const handleMarkFavorite = (url, isFavorite) => {
    axios
      .put('http://localhost:5000/mark-favorite', { url, isFavorite })
      .then(() => {
        retrieveWordCountData();
      })
      .catch((error) => {
        console.error('Error marking URL as favorite:', error);
      });
  };

  return (
    <div>
      <br/>
      <h1>Word Count Checker</h1>
      <br/>
      <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter website URL" />
      <br/>
      <br/>
      <button className="vertical-center" onClick={handleWordCountCheck}>Check Word Count</button>
      <br/>
      {wordCount !== null && (
        <p>Word Count: {wordCount}</p>
      )}
      <br/>
      <h2>Word Count Data</h2>
      <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Website URL</th>
            <th scope="col">Count</th>
            <th scope="col">Favourite</th>
            <th scope="col">Web Links</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wordCountData.map((data) => (
            <tr key={data._id}>
              <td>{data.url}</td>
              <td>{data.count}</td>
              <td>{data.isFavorite ? 'Yes' : 'No'}</td>
              <td>
                {data.webLinks.map((link, index) => (
                  <p key={index}>{link}</p>
                ))}
              </td>
              <td>
                <button onClick={() => handleMarkFavorite(data.url, !data.isFavorite)}>
                  {data.isFavorite ? 'Remove Favorite' : 'Mark as Favorite'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default WordCountChecker;
