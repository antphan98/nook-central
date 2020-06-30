import fetch from 'node-fetch';
import { useState, useEffect } from 'react';
import { Container, Header, Image, Grid } from 'semantic-ui-react';

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
    return null;
  } else {
    return (
      <div>
        <Container>
          {results.map((result) => (
            <Grid celled key={result} href={result.site_detail_url}>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Image src={result.image.original} />
                </Grid.Column>

                <Grid.Column width={13}>
                  <Header>{result.title}</Header>
                  <span style={{ color: 'black' }}>
                    Written by: {result.authors}
                  </span>
                  <p style={{ color: 'black' }}>
                    Publish date: {result.publish_date}
                  </p>
                  <p style={{ color: 'black' }}>{result.deck}</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ))}
        </Container>
      </div>
    );
  }
}

export default Articles;
