import useSWR from 'swr';
import BugItem from '../../components/BugItem/BugItem';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { Table, Container, Input } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { bugs } from '../../data/bugs';
import fetch from 'node-fetch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function bug() {
  const { error } = useSWR('/api/bugs', fetcher);
  if (error) return <div>Failed to load</div>;

  const [userProgress, setUserProgress] = useState([]);
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

  useEffect(() => {
    fetch('/api/user-progress')
      .then((results) => results.json())
      .then((data) => {
        setUserProgress(data.data);
      });
  }, []);

  const isSavedToProgress = (bugName) => {
    let isSaved = false;
    userProgress &&
      userProgress.bugs &&
      userProgress.bugs.forEach((bug) => {
        if (bugName === bug) {
          isSaved = true;
        }
      });
    return isSaved;
  };

  return (
    <div className="container">
      <Header />
      <Nav />
      <h1>Bugs</h1>
      <Input
        type="text"
        placeholder="Search"
        value={searchBug}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          const currentMonth = new Date().getMonth();
          const monthMap = {
            0: 'jan',
            1: 'feb',
            2: 'mar',
            3: 'apr',
            4: 'may',
            5: 'jun',
            6: 'jul',
            7: 'aug',
            8: 'sep',
            9: 'oct',
            10: 'nov',
            11: 'dec',
          };
          const filteredBugs = bugs.filter((b) => {
            if (b[monthMap[currentMonth]]) {
              return true;
            }
            return false;
          });
          setBugList(filteredBugs);
        }}
      >
        Filter Month
      </button>

      <button
        onClick={() => {
          setBugList(bugs);
        }}
      >
        Show All Bugs
      </button>

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
          <Table.Body className="bugTable">
            {bugList &&
              bugList.map((bug, i) => (
                <BugItem
                  key={i}
                  bug={bug}
                  isSavedToProgress={isSavedToProgress(bug.name)}
                  handleSelect={setUserProgress}
                />
              ))}
          </Table.Body>
        </Table>
      </Container>

      <style jsx global>{`
        @font-face {
          font-family: Humming;
          src: url('font/Humming.otf') format('opentype');
        }

        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }

        * {
          font-family: Humming !important;
        }
      `}</style>
    </div>
  );
}
