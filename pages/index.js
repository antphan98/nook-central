import Header from '../components/Header/Header';
// import Nav from '../components/Nav/Nav';
import Head from 'next/head';
import Articles from '../components/Articles/Articles';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Header />

      <div className="article-header">
        <h1 className="article-title">
          <img src="images/nooks.png" width="50"></img>
          &nbsp; Animal Crossing News &nbsp;
          <img src="images/nooks.png" width="50"></img>
        </h1>
      </div>
      <Articles />

      <style jsx global>{`
        @font-face {
          font-family: FinkHeavy;
          src: url(fonts/FinkHeavy.otf) format('opentype');
        }
        .article-header {
          background-color: #55a3e3;
          border-radius: 30px;
          text-align: center;
          padding: 10px;
          margin: 10px;
          border-color: #4b8cc2;
          border-style: solid;
        }

        .article-title {
          color: white;
          font-family: FinkHeavy;
          letter-spacing: 1px;
          font-size: 3rem;
          text-shadow: 3px 3px #9c6858;
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
