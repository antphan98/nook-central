import useSWR from 'swr';
import Fish from '../../components/Fish/Fish';
import { Table, Container } from 'semantic-ui-react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useState, useEffect } from 'react';
import { fish } from '../../data/fish';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function fishies() {
  const { error } = useSWR('/api/fish', fetcher);

  if (error) return <div>Failed to load</div>;

  const [fishList, setFishList] = useState([]);
  const [searchFish, setSearchFish] = useState('');
  const handleChange = (e) => {
    setSearchFish(e.target.value);
  };

  useEffect(() => {
    const results = fish.filter((fishies) =>
      fishies.name.toLowerCase().includes(searchFish)
    );
    setFishList(results);
  }, [searchFish]);

  return (
    <div className="container">
      <Header />
      <Nav />
      <h1>Fish</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchFish}
        onChange={handleChange}
      />
      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Shadow Size</Table.HeaderCell>

              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Container>

      {fishList && fishList.map((p, i) => <Fish key={i} fish={p} />)}
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
