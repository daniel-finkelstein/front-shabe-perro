import { Link } from 'react-router-dom';

import './../Navbar/Navbar.css';


function Navbar({title}) {
  return (
    <>
    <div className="header-container">
      <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
        <div className="small-logo">KartenKampf</div>
      </Link>
      <div className="title">{title}</div>
    </div>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/about">Acerca de</Link>
      <Link to="/rules">Reglas</Link>
    </nav>
    </>
  );
}

export default Navbar;