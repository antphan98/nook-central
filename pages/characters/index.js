import useSWR from 'swr';
import Characters from '../../components/Characters/Characters';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import SpeciesButtons from '../../components/SpeciesButtons/SpeciesButtons';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function characters() {
  const { data, error } = useSWR('/api/characters', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const species = [];
  data.forEach((character) => {
    if (species.includes(character.species)) {
      return data.map((species) => {
        return { species };
      });
    }

    species.push(character.species);
  });

  return (
    <div className="container">
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      <Nav />
      <SpeciesButtons />

      <ul>
        {data.map((p, i) => (
          <Characters key={i} characters={p} />
        ))}
      </ul>
    </div>
  );
}
