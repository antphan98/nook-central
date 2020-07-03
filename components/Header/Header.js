import Nav from '../../components/Nav/Nav';
export default function Header() {
  return (
    <div className="header">
      <section>
        <img className="header acheader" src="images/nav.jpg" alt="Header" />
        <Nav />
      </section>
      <style jsx>{`
        .header {
          width: 100vw;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
