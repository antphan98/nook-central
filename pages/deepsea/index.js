import useSWR from 'swr';
import DeepSeaItem from '../../components/DeepSeaItem/DeepSeaItem';
import Header from '../../components/Header/Header';
import { Table, Container, Input, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { deepsea } from '../../data/deepsea';
import fetch from 'node-fetch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function deepseas() {
  const { error } = useSWR('/api/deepsea', fetcher);
  if (error) return <div>Failed to load</div>;

  const [userProgress, setUserProgress] = useState([]);
  const [deepSeaList, setDeepSeaList] = useState([]);
  const [searchDeepSea, setSearchDeepSea] = useState('');
  const handleChange = (e) => {
    setSearchDeepSea(e.target.value);
  };

  useEffect(() => {
    const results = deepsea.filter((deepseas) =>
      deepseas.name.toUpperCase().includes(searchDeepSea.toUpperCase())
    );
    setDeepSeaList(results);
  }, [searchDeepSea]);

  useEffect(() => {
    fetch('/api/user-progress')
      .then((results) => results.json())
      .then((data) => {
        setUserProgress(data.data);
      });
  }, []);

  const isSavedToProgress = (deepSeaName) => {
    let isSaved = false;
    userProgress &&
      userProgress.deepsea &&
      userProgress.deepsea.forEach((deepseas) => {
        if (deepSeaName === deepseas) {
          isSaved = true;
        }
      });
    return isSaved;
  };

  return (
    <div className="container">
      <Header />
      <div className="deepsea-header">
        <h1 className="deepsea-title">
          {' '}
          <img width="50" className="pascal-img" src="images/pascal.png"></img>
          &nbsp; Deep Sea &nbsp;
          <img width="50" className="pascal-img" src="images/pascal.png"></img>
        </h1>
      </div>
      <div className="deepsea-search">
        <Input
          className="search"
          type="text"
          placeholder="Search For Creature..."
          value={searchDeepSea}
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
            const filteredDeepSea = deepsea.filter((b) => {
              if (b[monthMap[currentMonth]]) {
                return true;
              }
              return false;
            });
            setDeepSeaList(filteredDeepSea);
          }}
        >
          Creatures Available This Month
        </Button>

        <Button
          className="show-all-btn"
          onClick={() => {
            setDeepSeaList(deepsea);
          }}
        >
          Show All Deep Sea Creatures
        </Button>
      </div>
      <Container>
        <Table fixed>
          <Table.Body className="deepSeaTable">
            {deepSeaList &&
              deepSeaList.map((deepseas, i) => (
                <DeepSeaItem
                  key={i}
                  deepseas={deepseas}
                  isSavedToProgress={isSavedToProgress(deepseas.name)}
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

        .deepsea-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }
        .deepsea-title {
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

        .deepsea-search {
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
