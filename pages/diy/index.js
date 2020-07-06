import useSWR from 'swr';
import DiyItem from '../../components/DiyItem/DiyItem';
import Header from '../../components/Header/Header';
import { Container, Table, Input, Button, Dropdown } from 'semantic-ui-react';
import { diy } from '../../data/diy';
import { useState, useEffect } from 'react';
import fetch from 'node-fetch';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function diys() {
  const { error } = useSWR('/api/diy', fetcher);
  if (error) return <div>Failed to load</div>;

  const [userProgress, setUserProgress] = useState([]);
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

  const filterByCategory = (Category) => {
    const filtered = diy.filter((diys) => {
      return diys.Category === Category;
    });
    setDiyList(filtered);
  };

  useEffect(() => {
    fetch('/api/user-progress')
      .then((results) => results.json())
      .then((data) => {
        setUserProgress(data.data);
      });
  }, []);

  const isSavedToProgress = (diyName) => {
    let isSaved = false;
    userProgress &&
      userProgress.diy &&
      userProgress.diy.forEach((diys) => {
        if (diyName === diys) {
          isSaved = true;
        }
      });
    return isSaved;
  };

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

        <Dropdown item className="cat-btn" text="Fashion">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => filterByCategory('Bags')}>
              Bags
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Dresses')}>
              Dresses
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Headwear')}>
              Headwear
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Shoes')}>
              Shoes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Umbrellas')}>
              Umbrellas
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item className="cat-btn" text="Decorations">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => filterByCategory('Fencing')}>
              Fencing
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Floors')}>
              Floors
            </Dropdown.Item>

            <Dropdown.Item onClick={() => filterByCategory('Housewares')}>
              Housewares
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Miscellaneous')}>
              Miscellaneous
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Other')}>
              Other
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Rugs')}>
              Rugs
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Tools')}>
              Tools
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Wall-mounted')}>
              Wall-mounted
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterByCategory('Wallpaper')}>
              Wallpaper
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button
          className="all-cat-btn"
          onClick={() => {
            setDiyList(diy);
          }}
        >
          Show All DIY
        </Button>
      </div>
      <Container>
        <Table fixed>
          <Table.Body>
            {diyList &&
              diyList.map((diys, i) => (
                <DiyItem
                  key={i}
                  diys={diys}
                  isSavedToProgress={isSavedToProgress(diys.Name)}
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

        .cat-btn,
        .ui.button.all-cat-btn {
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

        .cat-btn:hover,
        .ui.button.all-cat-btn:hover {
          transform: scale(0.95) !important;
          box-shadow: 1px 5px rgba(0, 0, 0, 0.24) !important;
          z-index: 999;
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
