import useSWR from 'swr';
import Bugs from '../../components/Bugs/Bugs';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { Table, Container, Dropdown, Menu } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { bugs } from '../../data/bugs';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function bug() {
  const { data, error } = useSWR('/api/bugs', fetcher);
  if (error) return <div>Failed to load</div>;

  const [bugList, setBugList] = useState([]);
  const [searchBug, setSearchBug] = useState('');
  const handleChange = (e) => {
    setSearchBug(e.target.value);
  };

  useEffect(() => {
    const results = bugs.filter((bug) =>
      bug.name.toLowerCase().includes(searchBug)
    );
    setBugList(results);
  }, [searchBug]);

  return (
    <div className="container">
      <Header />
      <Nav />
      <h1>Bugs</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchBug}
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
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Container>

      {bugList && bugList.map((p, i) => <Bugs key={i} bugs={p} />)}

      <style jsx global>{`
        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }

        .dropbtn {
          background-color: #4caf50;
          color: white;
          padding: 16px;
          font-size: 16px;
          border: none;
        }

        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f1f1f1;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown-content a:hover {
          background-color: #ddd;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown:hover .dropbtn {
          background-color: #3e8e41;
        }
      `}</style>
    </div>
  );
}
