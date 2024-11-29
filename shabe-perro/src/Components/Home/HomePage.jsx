import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../auth/AuthContext';

import Nav from './../Navbar/Navbar';

import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [topPlayers, setTopPlayers] = useState([]); // Estado para los jugadores top
  
  const handleSearchGame = () => {
    navigate('/search');
  };
  const handleEditProfile = () => {
    navigate('/edit');
  };
  const handleLogout = () => {
    console.log("Quiero logout");
    logout();
    navigate('/');
  };

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return null;
    }
  
    console.log(token);
    axios({
      method: 'get',
      url: `${import.meta.env.VITE_BACKEND_URL}/home`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log(response.data);
        console.log(response.data.userId);
        setUsername(response.data.username);
        setIsAuthorized(true);
      })
      .catch(error => {
        console.log('Authentication error:', {error});
        setIsAuthorized(false);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  // Nueva solicitud para obtener los jugadores top-players
  useEffect(() => {
    if (token) {
      axios({
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/users/top-players`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          setTopPlayers(response.data);
        })
        .catch(error => {
          console.log('Error fetching top players:', error);
        });
    }
  }, [token]);

  if (isLoading) {
    return (
      <h1>Cargando...</h1>
    );
  } else if (!isAuthorized) {
    navigate('/');
    return null;
  } else {
    return (
      <>
        <header>
          <Nav title={`¡Bienvenido ${username}!`} />
        </header>

        <div className="homepage">
          <div className="left-column">
            <div className="buttons">
              <button className="button small blue shadow" onClick={handleSearchGame}>Jugar</button>
              <button className="button small white shadow" onClick={handleEditProfile}>Editar perfil</button>
              <button className="button small white shadow" onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <div className="white-box">
              <h1>Información sobre el cinturón y estadísticas</h1>
              <p>Mucho texto</p>
            </div>
          </div>

          <div className="right-column">
            <div className="white-box">
              <h1>Mejores jugadores</h1>
              <ul>
                {topPlayers.length > 0 ? (
                  topPlayers.map((player, index) => (
                    <li key={player.id}>
                      {index + 1}. {player.username} - {player.wins} victorias
                    </li>
                  ))
                ) : (
                  <p>No hay jugadores disponibles.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default HomePage;
