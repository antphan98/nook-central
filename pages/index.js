import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import Head from "next/head";
import Articles from "../components/Articles/Articles";

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
      <Nav />
      <Articles />

      <style jsx global>{`
        body {
          background-image: url(images/acbackground.jpg);
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}
