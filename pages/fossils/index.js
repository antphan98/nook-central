import useSWR from 'swr'
import Fossils from '../../components/Fossils/Fossils';
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Head from "next/head";

const fetcher = url => fetch(url).then(res => res.json())

export default function fossils() {
  const { data, error } = useSWR('/api/fossils', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
      <div className="container">
          <Head>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
    </Head>
    <Header/>
    <Nav/>

    <ul>
      {data.map((p, i) => (
        <Fossils key={i} fossils={p} />
      ))}
    </ul>
    
  
    </div>
  )
}