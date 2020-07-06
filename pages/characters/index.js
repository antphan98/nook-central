import useSWR from 'swr';
import Characters from '../../components/Characters/Characters';
import Header from '../../components/Header/Header';
import { Container, Table, Input } from 'semantic-ui-react';
import { characters } from '../../data/characters';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function character() {
  const { error } = useSWR('/api/characters', fetcher);
  if (error) return <div>Failed to load</div>;

  const [charList, setCharList] = useState([]);
  const [searchChar, setSearchChar] = useState('');
  const handleChange = (e) => {
    setSearchChar(e.target.value);
  };

  useEffect(() => {
    const results = characters.filter((character) =>
      character.name.toUpperCase().includes(searchChar.toUpperCase())
    );
    setCharList(results);
  }, [searchChar]);

  return (
    <div className="container">
      <Header />

      <div className="villager-header">
        <h1 className="villager-title">
          <img width="50" className="villager" src="images/sherb.png"></img>
          &nbsp; Villagers &nbsp;
          <img width="50" className="villager" src="images/sherb.png"></img>
        </h1>
      </div>
      <div className="char-search">
        <Input
          type="text"
          className="search"
          placeholder="Search For A Villager..."
          value={searchChar}
          onChange={handleChange}
        />
      </div>
      <Container>
        <Table fixed>
          <Table.Body>
            {charList &&
              charList.map((p, i) => <Characters key={i} characters={p} />)}
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

        .villager-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }
        .villager-title {
          color: white;
          font-family: FinkHeavy;
          font-size: 3rem;
          text-shadow: 3px 3px #9c6858;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .char-search {
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
