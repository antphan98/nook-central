import useSWR from 'swr';
import Characters from '../../components/Characters/Characters';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import { Container, Table } from 'semantic-ui-react';
// import SpeciesButtons from '../../components/SpeciesButtons/SpeciesButtons';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function characters() {
  const { data, error } = useSWR('/api/characters', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const species = [];
  data.forEach((character) => {
    if (species.includes(character.species)) {
      return data.map((species) => {
        return { species };
      });
    }

    species.push(character.species);
  });

  return (
    <div className="container">
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      <Nav />
      {/* <SpeciesButtons /> */}

      <h1>Characters</h1>
      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Species</Table.HeaderCell>
              <Table.HeaderCell>Personality</Table.HeaderCell>

              <Table.HeaderCell>Birthday</Table.HeaderCell>
              <Table.HeaderCell>Catchphrase</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Container>

      {data.map((p, i) => (
        <Characters key={i} characters={p} />
      ))}
      <style jsx global>{`
        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
}
