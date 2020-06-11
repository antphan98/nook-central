import useSWR from 'swr';
import Fish from '../../components/Fish/Fish';
import { Table, Container, Dropdown, Menu } from 'semantic-ui-react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function fish() {
  const { data, error } = useSWR('/api/fish', fetcher);

  if (error) return <div>Failed to load</div>;

  const [fishList, setFishList] = useState([]);

  useEffect(() => {
    setFishList(data);
  }, [data]);

  const filterByTime = (time) => {
    const filtered = data.filter((fish) => {
      return fish.time === time;
    });

    setFishList(filtered);
  };

  return (
    <div className="container">
      <Header />
      <Nav />
      <h1>Fish</h1>
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
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
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
