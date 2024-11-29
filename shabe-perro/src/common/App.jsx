import { useNavigate } from 'react-router-dom';
import Nav from './../Components/Navbar/Navbar';


function App() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Nav title='Home'/>
      </header>
      <div className='centered-content'>
        <div className='big-logo'>KartenKampf</div>
        <div className="buttons">
          <button className = "button big blue shadow" onClick={() => navigate('/signup')}>Registrarse</button>
          <button className = "button big white shadow" onClick={() => navigate('/login')}>Iniciar Sesión</button>
        </div>
      </div>
    </>
  )
}

export default App