import useSWR from 'swr';
import FossilItem from '../../components/FossilItem/FossilItem';
import Header from '../../components/Header/Header';
import Head from 'next/head';
import { Table, Container, Input } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { fossils } from '../../data/fossils';
import fetch from 'node-fetch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function fossil() {
  const { error } = useSWR('/api/fossils', fetcher);

  if (error) return <div>Failed to load</div>;

  const [userProgress, setUserProgress] = useState([]);
  const [fossilList, setFossilList] = useState([]);
  const [searchFossil, setSearchFossil] = useState('');
  const handleChange = (e) => {
    setSearchFossil(e.target.value);
  };

  useEffect(() => {
    const results = fossils.filter((fossil) =>
      fossil.name.toLowerCase().includes(searchFossil)
    );
    setFossilList(results);
  }, [searchFossil]);

  useEffect(() => {
    fetch('/api/user-progress')
      .then((results) => results.json())
      .then((data) => {
        setUserProgress(data.data);
      });
  }, []);

  const isSavedToProgress = (fossilName) => {
    let isSaved = false;
    userProgress &&
      userProgress.fossils &&
      userProgress.fossils.forEach((fossil) => {
        if (fossilName === fossil) {
          isSaved = true;
        }
      });
    return isSaved;
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

      <div className="fossil-header">
        <h1 className="fossil-title">
          <img width="50" className="fossil" src="images/fossil.png"></img>
          &nbsp; Fossils &nbsp;
          <img width="50" className="fossil" src="images/fossil.png"></img>
        </h1>
      </div>
      <div className="fossil-search">
        <Input
          type="text"
          className="search"
          placeholder="Search For Fossil..."
          value={searchFossil}
          onChange={handleChange}
        />
      </div>
      <Container>
        <Table fixed>
          <Table.Body className="fossilTable">
            {fossilList &&
              fossilList.map((fossil, i) => (
                <FossilItem
                  key={i}
                  fossil={fossil}
                  isSavedToProgress={isSavedToProgress(fossil.name)}
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

        .fossil-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }
        .fossil-title {
          color: white;
          font-family: FinkHeavy;
          letter-spacing: 1px;
          font-size: 3rem;
          text-shadow: 3px 3px #9c6858;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .fossil-search {
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
