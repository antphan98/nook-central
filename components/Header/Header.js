import Nav from '../../components/Nav/Nav';
export default function Header() {
  return (
    <div className="header">
      <section>
        <div className="title">
          <h1 className="nookcentral">Nook Central</h1>

          <img className="header acheader" src="images/nav.jpg" alt="Header" />
        </div>
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
          width: 70%;
          position: absolute;
          bottom: 30%;
          margin-left: 5%;
          font-family: FinkHeavy;
          color: #fcef89;
          font-size: 10rem;
          text-shadow: -5px -5px 0 #cc9067, 0 -5px 0 #cc9067, 5px -5px 0 #cc9067,
            5px 0 0 #cc9067, 5px 5px 0 #cc9067, 0 5px 0 #cc9067,
            -5px 5px 0 #cc9067, -5px 0 0 #cc9067;
        }
        @media only screen and (min-width: 300px) {
          .nookcentral {
            font-size: 3rem;
            display: inline;
            bottom: 80%;
            width: 80%;
            margin-left: 40px;
            text-shadow: -2px -2px 0 #cc9067, 0 -2px 0 #cc9067,
              2px -2px 0 #cc9067, 2px 0 0 #cc9067, 2px 2px 0 #cc9067,
              0 2px 0 #cc9067, -2px 2px 0 #cc9067, -2px 0 0 #cc9067;
          }
        }

        @media only screen and (min-width: 320px) {
          .nookcentral {
            font-size: 3rem;
            display: inline;
            bottom: 80%;
            width: 80%;
            margin-left: 40px;
            text-shadow: -2px -2px 0 #cc9067, 0 -2px 0 #cc9067,
              2px -2px 0 #cc9067, 2px 0 0 #cc9067, 2px 2px 0 #cc9067,
              0 2px 0 #cc9067, -2px 2px 0 #cc9067, -2px 0 0 #cc9067;
          }
        }

        @media only screen and (min-width: 600px) {
          .nookcentral {
            font-size: 3.5rem;
            display: inline;
            bottom: 80%;
            width: 80%;
            margin-left: 50px;
            text-shadow: -2px -2px 0 #cc9067, 0 -2px 0 #cc9067,
              2px -2px 0 #cc9067, 2px 0 0 #cc9067, 2px 2px 0 #cc9067,
              0 2px 0 #cc9067, -2px 2px 0 #cc9067, -2px 0 0 #cc9067;
          }
        }
        @media only screen and (min-width: 600px) {
          .nookcentral {
            font-size: 5rem;
            display: inline;
            bottom: 75%;
            width: 80%;
            margin-left: 50px;
            text-shadow: -2px -2px 0 #cc9067, 0 -2px 0 #cc9067,
              2px -2px 0 #cc9067, 2px 0 0 #cc9067, 2px 2px 0 #cc9067,
              0 2px 0 #cc9067, -2px 2px 0 #cc9067, -2px 0 0 #cc9067;
          }
        }

        @media only screen and (min-width: 768px) {
          .nookcentral {
            font-size: 6rem;
            display: inline;
            bottom: 70%;
            width: 80%;
            text-shadow: -3px -3px 0 #cc9067, 0 -3px 0 #cc9067,
              3px -3px 0 #cc9067, 3px 0 0 #cc9067, 3px 3px 0 #cc9067,
              0 3px 0 #cc9067, -3px 3px 0 #cc9067, -3px 0 0 #cc9067;
          }
        }

        @media only screen and (min-width: 992px) {
          .nookcentral {
            font-size: 8rem;
            display: inline;
            bottom: 30%;
            width: 80%;
          }
        }
        @media only screen and (min-width: 1024px) {
          .nookcentral {
            font-size: 8rem;
            display: inline;
            bottom: 30%;
            width: 80%;
          }
        }
        @media only screen and (min-width: 1200px) {
          .nookcentral {
            font-size: 10rem;
            display: inline;
            bottom: 30%;
            width: 80%;
            text-shadow: -5px -5px 0 #cc9067, 0 -5px 0 #cc9067,
              5px -5px 0 #cc9067, 5px 0 0 #cc9067, 5px 5px 0 #cc9067,
              0 5px 0 #cc9067, -5px 5px 0 #cc9067, -5px 0 0 #cc9067;
          }
        }
      `}</style>
    </div>
  );
}
