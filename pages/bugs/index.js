import useSWR from 'swr';
// import _ from 'lodash';
import Bugs from '../../components/Bugs/Bugs';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import { Table, Container, Dropdown, Menu } from 'semantic-ui-react';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function bug() {
  const { data, error } = useSWR('/api/bugs', fetcher);

  const [bugList, setBugList] = useState([]);

  useEffect(() => {
    setBugList(data);
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // const sortByTime = () => {
  //   const sorted = _.sortBy(bugList, ['time']);
  //   setBugList(sorted);
  //   console.log(sorted);
  // };

  const filterByLocation = (location) => {
    const filtered = data.filter((bug) => {
      return bug.location === location;
    });

    setBugList(filtered);
  };
  const filterByTime = (time) => {
    const filtered = data.filter((bug) => {
      return bug.time === time;
    });

    setBugList(filtered);
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
      <h1>Bugs</h1>
      <Menu vertical>
        <Dropdown item text="Categories">
          <Dropdown.Menu>
            <Dropdown.Header>Time</Dropdown.Header>
            <Dropdown.Item onClick={() => filterByTime('4 AM - 7 PM')}>
              4 AM - 7 PM
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByTime('8 AM - 7 PM')}>
              8 AM - 7 PM
            </Dropdown.Item>

            <Dropdown.Header>Location</Dropdown.Header>

            <Dropdown.Item onClick={() => filterByLocation('Flying')}>
              Flying
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByLocation('On Trees')}>
              On Trees
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByLocation('On Flowers')}>
              On Flowers
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
