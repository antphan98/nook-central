import useSWR from 'swr';
import Fossils from '../../components/Fossils/Fossils';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import { Table, Container } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { fossils } from '../../data/fossils';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function fossil() {
  const { error } = useSWR('/api/fossils', fetcher);

  if (error) return <div>Failed to load</div>;

  const [fossilList, setFossilList] = useState([]);
  const [searchFossil, setSearchFossil] = useState('');
  const handleChange = (e) => {
    setSearchFossil(e.target.value);
  };

  useEffect(() => {
    const results = fossils.filter((fossil) =>
      fossil.name.toLowerCase().includes(searchFossil)
    );
    setFossilList(results);
  }, [searchFossil]);

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
      <input
        type="text"
        placeholder="Search"
        value={searchFossil}
        onChange={handleChange}
      />
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
