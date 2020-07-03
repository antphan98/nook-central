import useSWR from 'swr';
import FishItem from '../../components/FishItem/FishItem';
import { Table, Container, Input, Button } from 'semantic-ui-react';
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { fish } from '../../data/fish';
import fetch from 'node-fetch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function fishies() {
  const { error } = useSWR('/api/fish', fetcher);

  if (error) return <div>Failed to load</div>;

  const [userProgress, setUserProgress] = useState([]);
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

  useEffect(() => {
    fetch('/api/user-progress')
      .then((results) => results.json())
      .then((data) => {
        setUserProgress(data.data);
      });
  }, []);

  const isSavedToProgress = (fishName) => {
    let isSaved = false;
    userProgress &&
      userProgress.fish &&
      userProgress.fish.forEach((fishies) => {
        if (fishName === fishies) {
          isSaved = true;
        }
      });
    return isSaved;
  };

  return (
    <div className="container">
      <Header />
      <div className="fish-header">
        <h1 className="fish-title">
          <img width="50" className="fish-img" src="images/fish.png"></img>
          &nbsp; Fish &nbsp;
          <img width="50" className="fish-img" src="images/fish.png"></img>
        </h1>
      </div>
      <div className="fish-search">
        <Input
          type="text"
          className="search"
          placeholder="Search For Fish..."
          value={searchFish}
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
            const filteredBugs = fish.filter((b) => {
              if (b[monthMap[currentMonth]]) {
                return true;
              }
              return false;
            });
            setFishList(filteredBugs);
          }}
        >
          Fish Available This Month
        </Button>

        <Button
          className="show-all-btn"
          onClick={() => {
            setFishList(fish);
          }}
        >
          Show All Fish
        </Button>
      </div>
      <Container>
        <Table fixed>
          <Table.Body className="fishTable">
            {fishList &&
              fishList.map((fishies, i) => (
                <FishItem
                  key={i}
                  fishies={fishies}
                  isSavedToProgress={isSavedToProgress(fishies.name)}
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
        .fish-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }
        .fish-title {
          color: white;
          font-family: FinkHeavy;
          letter-spacing: 1px;
          font-size: 3rem;
          text-shadow: 3px 3px #9c6858;
          display: flex;
          justify-content: center;
          align-items: center;
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
        .fish-search {
          text-align: center;
          margin: 15px;
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
