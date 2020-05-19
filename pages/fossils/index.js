import useSWR from 'swr';
import Fossils from '../../components/Fossils/Fossils';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import { Container, Table } from 'semantic-ui-react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function fossils() {
  const { data, error } = useSWR('/api/fossils', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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

      <h1>Fossils</h1>
      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Container>

      {data.map((p, i) => (
        <Fossils key={i} fossils={p} />
      ))}
    </div>
  );
}
