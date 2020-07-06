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
            <Grid key={result} href={result.site_detail_url}>
              <Grid.Row>
                <Grid.Column width={3} className="articleimg">
                  <Image src={result.image.original} />
                </Grid.Column>

                <Grid.Column width={13} className="articledesc">
                  <Header>{result.title}</Header>
                  <p style={{ color: 'black' }}>Written by: {result.authors}</p>
                  <p style={{ color: 'black' }}>
                    Publish date: {result.publish_date}
                  </p>
                  <p style={{ color: 'black' }}>{result.deck}</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ))}
        </Container>
        <style jsx global>{`
          @font-face {
            font-family: Humming;
            src: url('fonts/Humming.otf') format('opentype');
          }

          .ui.container {
            background: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 20px;
          }

          .row {
            -moz-transition: all 0.3s ease-in;
            -o-transition: all 0.3s ease-in;
            -webkit-transition: all 0.3s ease-in;
            transition: all 0.3s ease-in;
          }
          .row:hover {
            background: beige;
          }

          .ui.header,
          p {
            font-family: Humming;
          }

          @media only screen and (max-width: 768px) {
            .ui.grid > .row > [class*='thirteen wide'].column.articledesc {
              width: 100% !important;
              text-align: center;
            }
            .ui.grid > .row > [class*='three wide'].column.articleimg {
              width: 100% !important;
              margin-bottom: 20px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Articles;
