import useSWR from 'swr';
import DiyItem from '../../components/DiyItem/DiyItem';
import Header from '../../components/Header/Header';
import { Container, Table, Input } from 'semantic-ui-react';
import { diy } from '../../data/diy';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function diys() {
  const { error } = useSWR('/api/diy', fetcher);
  if (error) return <div>Failed to load</div>;

  const [diyList, setDiyList] = useState([]);
  const [searchDiy, setSearchDiy] = useState('');
  const handleChange = (e) => {
    setSearchDiy(e.target.value);
  };

  useEffect(() => {
    const results = diy.filter((diys) =>
      diys.Name.toUpperCase().includes(searchDiy.toUpperCase())
    );
    setDiyList(results);
  }, [searchDiy]);

  return (
    <div className="container">
      <Header />

      <div className="diy-header">
        <h1 className="diy-title">
          <img width="50" className="villager" src="images/diy.png"></img>
          &nbsp; DIY Recipes &nbsp;
          <img width="50" className="villager" src="images/diy.png"></img>
        </h1>
      </div>
      <div className="char-search">
        <Input
          type="text"
          className="search"
          placeholder="Search For A DIY Recipe..."
          value={searchDiy}
          onChange={handleChange}
        />
      </div>
      <Container>
        <Table fixed>
          <Table.Body>
            {diyList && diyList.map((diy, i) => <DiyItem key={i} diy={diy} />)}
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

        .diy-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }
        .diy-title {
          color: white;
          font-family: FinkHeavy;
          letter-spacing: 1px;
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
