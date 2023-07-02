import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import 'bootstrap/dist/css/bootstrap.min.css';
import './WordCountChecker.css'

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

  const handleDeleteWordCount = (id) => {
    axios
      .delete(`http://localhost:5000/word-count/${id}`)
      .then(() => {
        retrieveWordCountData();
      })
      .catch((error) => {
        console.error('Error deleting word count:', error);
      });
  };


  return (
    <div>
      <br/>
      <br/>
      <h1 className="text-center">Word Count Checker</h1>
      <br/>
      <input className="form-control form-control-lg" type="text" placeholder=".form-control-lg" value={url} onChange={handleUrlChange} placeholder="Enter website URL" />
      <br/>
      <div className="text-center">
      <button className="btn btn-success text-center" onClick={handleWordCountCheck}>Check Word Count</button>
      </div>
      {wordCount !== null && (
        <p>Word Count: {wordCount}</p>
      )}
      <br/>
      <h2>Word Count Data : </h2>
      <br/>
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center" scope="col">Website URL</th>
            <th className="text-center" scope="col">Words Count</th>
            <th className="text-center" scope="col">Favourite</th>
            <th className="text-center" scope="col">Web Links</th>
            <th className="text-center" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wordCountData.map((data) => (
            <tr key={data._id}>
              <td className="text-center">{data.url}</td>
              <td className="text-center">{data.count}</td>
              <td className="text-center">{data.isFavorite ? 'Yes' : 'No'}</td>
              <td className="text-center">
                {data.webLinks.map((link, index) => (
                  <p key={index}>{link}</p>
                ))}
              </td>
              <td className="text-center">
                <button className="btn btn-success btn-sm margin-left"  onClick={() => handleMarkFavorite(data.url, !data.isFavorite)}>
                  <span>{data.isFavorite ? 'Remove Favourite' : 'Add Favorite'}</span>
                </button>
                <button className="btn btn-success btn-sm col-xs-2 margin-left" onClick={() => handleDeleteWordCount(data._id)}>
                  <span>Delete</span>
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
