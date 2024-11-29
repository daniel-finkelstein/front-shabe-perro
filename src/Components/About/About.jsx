import Nav from './../Navbar/Navbar';
import './About.css';

const groupPhoto = "/fotos/juani.jpg";
const person1Photo = "/fotos/dani.jpg";
const person2Photo = "/fotos/assadi.jpg";
const person3Photo = "/fotos/juani.jpg";

const About = () => {
  return (
    <>
    <header>
      <Nav title='Acerca de'/>
    </header>
    <div className="about-container">
      <div className="group-photo">
        <img src={groupPhoto} alt="Foto de grupo" />
      </div>
      <h1>Nosotros</h1>
      <div className="person-section">
        <img src={person1Photo} alt="Persona 1" />
        <div className="person-details">
          <h2>Daniel Finkelstein</h2>
          <p>Descrip</p>
        </div>
      </div>
      <div className="person-section">
        <img src={person2Photo} alt="Persona 2" />
        <div className="person-details">
          <h2>Vicente Assadi</h2>
          <p>Descrip</p>
        </div>
      </div>
      <div className="person-section">
        <img src={person3Photo} alt="Persona 3" />
        <div className="person-details">
          <h2>Juan Ignacio Vivanco</h2>
          <p>Descrip</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
