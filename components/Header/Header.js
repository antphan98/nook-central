export default function Header() {
  return (
    <div>
      <img className="header acheader" src="images/acheader.jpg" alt="Header" />

      <style jsx>{`
        .header {
          width: 100%;
          align-items: center;
          margin-top: -150px;
        }
      `}</style>
    </div>
  );
}
