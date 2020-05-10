import useSWR from 'swr';
import Misc from '../../components/Misc/Misc';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function misc() {
  const { data, error } = useSWR('/api/misc', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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
      <ul>
        {data.map((p, i) => (
          <Misc key={i} misc={p} />
        ))}
      </ul>
    </div>
  );
}
