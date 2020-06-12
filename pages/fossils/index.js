import useSWR from 'swr';
import Fossils from '../../components/Fossils/Fossils';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import { Table, Container, Dropdown, Menu } from 'semantic-ui-react';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function fossils() {
  const { data, error } = useSWR('/api/fossils', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const [fossilList, setFossilList] = useState([]);

  useEffect(() => {
    setFossilList(data);
  }, [data]);

  const filterByTime = (time) => {
    const filtered = data.filter((fossil) => {
      return fossil.time === time;
    });

    setFossilList(filtered);
  };

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
      <Menu vertical>
        <Dropdown item text="Categories">
          <Dropdown.Menu>
            <Dropdown.Header>Time</Dropdown.Header>
            <Dropdown.Item onClick={() => filterByTime('9 AM - 4 PM')}>
              9 AM - 4 PM
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByTime('All day')}>
              All Day
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
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

      {fossilList && fossilList.map((p, i) => <Fossils key={i} fossils={p} />)}
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
