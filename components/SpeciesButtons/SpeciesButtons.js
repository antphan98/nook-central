import { useState, useEffect } from 'react';
import fetch from 'node-fetch';

function SpeciesButtons() {
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // data.forEach(character => {
  //     if (species.includes(character.species)) {
  //         return data.map(( species ) => {
  //             return {species};
  //         });
  //     }

  //     species.push(<button>character.species</button>)
  //     console.log(character.species)

  // });

  useEffect(() => {
    fetch('/api/characters')
      .then((res) => res.json())
      .then(
        (response) => {
          setIsLoaded(true);
          setResults(response.results);
          console.log(response.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  });

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

export default SpeciesButtons;
