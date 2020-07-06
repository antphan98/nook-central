import useSWR from 'swr';
import ArtItem from '../../components/ArtItem/ArtItem';
import Header from '../../components/Header/Header';
import { Container, Table, Input } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { art } from '../../data/art';
import fetch from 'node-fetch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function arts() {
  const { error } = useSWR('/api/art', fetcher);

  if (error) return <div>Failed to load</div>;

  const [userProgress, setUserProgress] = useState([]);
  const [artList, setArtList] = useState([]);
  const [searchArt, setSearchArt] = useState('');
  const handleChange = (e) => {
    setSearchArt(e.target.value);
  };

  useEffect(() => {
    const results = art.filter((arts) =>
      arts.name.toUpperCase().includes(searchArt.toUpperCase())
    );
    setArtList(results);
  }, [searchArt]);

  useEffect(() => {
    fetch('/api/user-progress')
      .then((results) => results.json())
      .then((data) => {
        setUserProgress(data.data);
      });
  }, []);

  const isSavedToProgress = (artName) => {
    let isSaved = false;
    userProgress &&
      userProgress.art &&
      userProgress.art.forEach((arts) => {
        if (artName === arts) {
          isSaved = true;
        }
      });

    return isSaved;
  };

  return (
    <div className="container">
      <Header />
      <div className="art-header">
        <h1 className="art-title">
          <img width="50" className="redd" src="images/redd.png"></img>&nbsp;
          Art &nbsp;
          <img width="50" className="redd" src="images/redd.png"></img>
        </h1>
      </div>
      <div className="art-search">
        <Input
          type="text"
          className="search"
          placeholder="Search For Art..."
          value={searchArt}
          onChange={handleChange}
        />
      </div>
      <Container>
        <Table fixed>
          <Table.Body className="artTable">
            {artList &&
              artList.map((arts, i) => (
                <ArtItem
                  key={i}
                  arts={arts}
                  isSavedToProgress={isSavedToProgress(arts.name)}
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
        .art-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }
        .art-title {
          color: white;
          font-family: FinkHeavy;
          letter-spacing: 1px;
          font-size: 3rem;
          text-shadow: 3px 3px #9c6858;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .art-search {
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
