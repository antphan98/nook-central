import useSWR from 'swr';
import Tools from '../../components/Tools/Tools';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Head from 'next/head';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function tools() {
  const { data, error } = useSWR('/api/tools', fetcher);

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
          <Tools key={i} tools={p} />
        ))}
      </ul>
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
