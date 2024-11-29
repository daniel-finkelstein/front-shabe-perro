import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Nav from './../Navbar/Navbar';
import { AuthContext } from './../../auth/AuthContext';

import './Profile.css';

function Login() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleKeyDown(event) {
    if (event.key === 'Enter') {
      await handleSubmit();
    }
  };

  async function handleSubmit(event) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email: email,
        password: password
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
  }, [email, password])

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
            type="password" 
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        {error && <p className="error-message">Correo o contraseña incorrectos. Inténtalo de nuevo.</p>}
        <div className='buttons'>
          <button className="button white" onClick={() => navigate(-1)}>Volver</button>
          <button className={`button blue ${password && email ? '' : 'disabled'}`} disabled={!password ||!email} onClick={handleSubmit}>Confirmar</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
