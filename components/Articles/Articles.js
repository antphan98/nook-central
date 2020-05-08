import fetch from 'node-fetch';
import { useState, useEffect } from 'react';

function Articles() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then(
        (response) => {
          setIsLoaded(true);
          setResults(response.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {results.map((result) => (
          <li key={result.title}>
            {result.title}
            <td>
              <img src={result.image.square_small}></img>
            </td>
          </li>
        ))}
      </ul>
    );
  }
}

export default Articles;
