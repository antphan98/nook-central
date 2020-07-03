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
      arts.name.toLowerCase().includes(searchArt)
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

      <Input
        type="text"
        placeholder="Search"
        value={searchArt}
        onChange={handleChange}
      />

      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>

              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Buying Price</Table.HeaderCell>
              <Table.HeaderCell>Selling Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
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
        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
}
