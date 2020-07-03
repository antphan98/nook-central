import Nav from '../../components/Nav/Nav';
export default function Header() {
  return (
    <div className="header">
      <section>
        <h1 className="nookcentral">Nook Central</h1>

        <img className="header acheader" src="images/nav.jpg" alt="Header" />
        <Nav />
      </section>

      <style jsx>{`
        @font-face {
          font-family: FinkHeavy;
          src: url(fonts/FinkHeavy.otf) format('opentype');
        }
        .header {
          width: 100vw;
          align-items: center;
        }

        section {
          position: relative;
        }
        .nookcentral {
          position: absolute;
          bottom: 30%;
          margin-left: 5%;
          font-family: FinkHeavy;
          color: #e6dc81;
          font-size: 10rem;
          text-shadow: -5px -5px 0 #cc9067, 0 -5px 0 #cc9067, 5px -5px 0 #cc9067,
            5px 0 0 #cc9067, 5px 5px 0 #cc9067, 0 5px 0 #cc9067,
            -5px 5px 0 #cc9067, -5px 0 0 #cc9067;
        }
      `}</style>
    </div>
  );
}
