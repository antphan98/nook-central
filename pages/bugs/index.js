import useSWR from 'swr';
import Bugs from '../../components/Bugs/Bugs';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import { Table, Container } from 'semantic-ui-react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function bug() {
  const { data, error } = useSWR('/api/bugs', fetcher);

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
      <h1>Bugs</h1>
      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Container>

      {data.map((p, i) => (
        <Bugs key={i} bugs={p} />
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
