import useSWR from 'swr';
import FishItem from '../../components/FishItem/FishItem';
import { Table, Container, Input } from 'semantic-ui-react';
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
        <h1 className="fish-title">Fish</h1>
      </div>
      <Input
        type="text"
        placeholder="Search"
        value={searchFish}
        onChange={handleChange}
      />
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
        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
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
        }
      `}</style>
    </div>
  );
}
