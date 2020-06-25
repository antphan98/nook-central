import useSWR from 'swr';
import Art from '../../components/Art/Art';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { Container, Table, Input } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { art } from '../../data/art';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function arts() {
  const { error } = useSWR('/api/art', fetcher);

  if (error) return <div>Failed to load</div>;

  const [artList, setArtList] = useState([]);
  const [searchArt, setSearchArt] = useState('');
  const handleChange = (e) => {
    setSearchArt(e.target.value);
  };

  useEffect(() => {
    const results = art.filter((arts) =>
      arts.name.toLowerCase().includes(searchArt)
    );
    setArtList(results);
  }, [searchArt]);

  return (
    <div className="container">
      <Header />
      <Nav />

      <Input
        type="text"
        placeholder="Search"
        value={searchArt}
        onChange={handleChange}
      />

      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>

              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Buying Price</Table.HeaderCell>
              <Table.HeaderCell>Selling Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Container>

      {artList && artList.map((p, i) => <Art key={i} art={p} />)}

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
