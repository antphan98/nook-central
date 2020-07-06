import useSWR from 'swr';
import BugItem from '../../components/BugItem/BugItem';
import Header from '../../components/Header/Header';
import { Table, Container, Input, Button } from 'semantic-ui-react';
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
      bug.name.toUpperCase().includes(searchBug.toUpperCase())
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
      <div className="bugs-header">
        <h1 className="bugs-title">
          {' '}
          <img width="50" className="bug-img" src="images/bug.png"></img>
          &nbsp; Bugs &nbsp;
          <img width="50" className="bug-img" src="images/bug.png"></img>
        </h1>
      </div>
      <div className="bug-search">
        <Input
          className="search"
          type="text"
          placeholder="Search For Bug..."
          value={searchBug}
          onChange={handleChange}
        />

        <Button
          className="filter-month-btn"
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
          Bugs Available This Month
        </Button>

        <Button
          className="show-all-btn"
          onClick={() => {
            setBugList(bugs);
          }}
        >
          Show All Bugs
        </Button>
      </div>
      <Container>
        <Table fixed>
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
          font-family: FinkHeavy;
          src: url(fonts/FinkHeavy.otf) format('opentype');
        }
        @font-face {
          font-family: Humming;
          src: url('fonts/Humming.otf') format('opentype');
        }

        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }

        .ui.fixed.table {
          font-family: Humming;
          opacity: 0.9;
        }

        .bugs-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }
        .bugs-title {
          color: white;
          font-family: FinkHeavy;
          font-size: 3rem;
          text-shadow: 3px 3px #9c6858;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .ui.button.filter-month-btn,
        .ui.button.show-all-btn {
          background-color: #e6dc81;
          border-radius: 25px;
          padding: 10px;
          border-color: brown;
          border-style: solid;
          border-width: 0 3px 3px 0;
          box-shadow: 1px 5px #888888;
          font-size: 1.5rem;
          color: white;
          font-family: FinkHeavy;
          margin: 20px;
        }

        .ui.button.filter-month-btn:hover,
        .ui.button.show-all-btn:hover {
          transform: scale(0.95) !important;
          box-shadow: 1px 5px rgba(0, 0, 0, 0.24) !important;
          z-index: 999;
        }

        .bug-search {
          text-align: center;
          margin: 15px;
        }

        .search {
          border-radius: 25px;
          padding: 10px;
          border-color: brown;
          border-style: solid;
          border-width: 0 3px 3px 0;
          box-shadow: 1px 5px #888888;
          font-size: 1.5rem;
          color: white;
          font-family: FinkHeavy;
          margin: 20px;
          background-image: url(images/wood.jpg);
        }
        .ui.input > input {
          border-radius: 20px;
          border: none;
          font-family: Humming;
        }
      `}</style>
    </div>
  );
}
