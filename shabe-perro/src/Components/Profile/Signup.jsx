import { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Nav from './../Navbar/Navbar';
import { AuthContext } from './../../auth/AuthContext';

import './Profile.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [favoriteBear, setFavoriteBear] = useState('');
  const [loveToDCC, setLoveToDCC] =  useState(null);
  const [error, setError] = useState(false);
  const { token, setToken } = useContext(AuthContext);

  async function handleKeyDown(event) {
    if (event.key === 'Enter') {
      await handleSubmit();
    }
  };

  async function handleSubmit(event) {
    handleLoveToDCC();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        username: username,
        admin: false,
        email: email,
        password: password,
        favoriteFood: favoriteFood,
        favoriteColor: favoriteColor,
        favoriteBear: favoriteBear,
        loveToDCC: loveToDCC
      });
      const access_token = response.data.access_token;
      setToken(access_token);
      setError(false);
      navigate('/home');
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  
  useEffect(() => {
    setError(false);
  }, [email, password, username, repeatedPassword])

  const handleLoveToDCC = () => {
    if (!Number.isInteger(loveToDCC)) {
      setLoveToDCC(Math.max(Math.min(10, loveToDCC), 1));
    }
  }

  return (
    <>
    <header>
      <Nav title='Iniciar sesión'/>
    </header>
    <div className='centered-content'>
      <div className="login">
        <div className={`inputs-grid ${error ? 'error' : ''}`}>
          <input 
            type="email"
            placeholder='Correo electrónico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <input 
            type="text"
            placeholder='Nombre de usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <input 
            type="password" 
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <input 
            type="password" 
            placeholder='Repetir contraseña'
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <input 
            type="text"
            placeholder='Comida favorita'
            value={favoriteFood}
            onChange={(e) => setFavoriteFood(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input 
            type="text"
            placeholder='Color de puffle favorito'
            value={favoriteColor}
            onChange={(e) => setFavoriteColor(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input 
            type="text"
            placeholder='Especie de oso favorita'
            value={favoriteBear}
            onChange={(e) => setFavoriteBear(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input 
            type="number"
            placeholder='Amor al DCC'
            value={loveToDCC}
            onChange={(e) => setLoveToDCC(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {error && <p className="error-message">Credenciales incorrectas. Inténtalo de nuevo.</p>}
        <div className='buttons'>
          <button className="button white" onClick={() => navigate(-1)}>Volver</button>
          <button
            className={`button blue ${password && email && username && repeatedPassword ? '' : 'disabled'}`}
            disabled={!password ||!email || !username || !repeatedPassword}
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;
