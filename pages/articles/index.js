import useSWR from 'swr';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';
import Articles from '../../components/Articles/Articles';

const fetcher = () =>
  fetch(
    `https://www.gamespot.com/api/articles/?format=json&api_key=ce3e6d5e61b7cecf7d622fedfceb1ab2de3ade0b&filter=association%3A5000-487113&sort=publish_date:desc`
  ).then((res) => res.json());

export default function article() {
  const { data, error } = useSWR('/api/articles', fetcher);

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
          <Articles key={i} articles={p} />
        ))}
      </ul>
    </div>
  );
}
