
export default function Header() {

    return (
        <div>
        <img className="header acheader" src="images/acheader.jpg" alt="Header" />

        <img className="logo aclogo" src="images/aclogo.png" alt="Logo" />
        <style jsx>{`
       .header {
        width: 100%;
        align-items: center;
        margin-top: -150px;
        position: fixed;

       
    }
    
    .logo {
        position: relative;
        width: 20%;
    
    }
      `}</style>
</div>
    );
}
