import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Search.css';

import { AuthContext } from './../../auth/AuthContext';

import Nav from './../Navbar/Navbar';


const Search = () => {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);

  const [matchId, setMatchId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('matchId', matchId);
  }, [matchId]);

  useEffect(() => {
    localStorage.setItem('playerId', playerId);
    Cookies.set('playerId', playerId, { expires: 1, path: '/' });
  }, [playerId]);

  useEffect(() => {
    localStorage.setItem('opponentUsername', opponentUsername);
  }, [opponentUsername]);

  useEffect(() => {
    localStorage.setItem('searchResult', searchResult);
  }, [searchResult]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Search match");
    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/search`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      const data = response.data;
      setIsAuthorized(true);
      setSearchResult(data.message);
      if (['Created', 'Already'].includes(data.message)) {
        setMatchId(data.matchId);
        setPlayerId(data.playerId);
        setOpponentUsername(data.opponentUsername);
      }
      console.log(data);
    })
    .catch((error) => {
      const data = error.response.data;
      setSearchResult(data.message);
      console.log(data);
    })
    .finally(() => setIsLoading(false));
  }, []);


  return (
    isLoading ? <>
    <header>
      <Nav title={`Partida contra (?)`}/>
    </header>
    <h1>Cargando...</h1> 
    </>
    :
    !isAuthorized ? <>
    <header>
      <Nav title={`Partida contra (?)`}/>
    </header>
    <h1>Surgió un error, o no estás autorizado a este recurso</h1>
    </>
    :
    <>
    <header>
      <Nav title='Búsqueda de partida'/>
    </header>
    <h1>
        {
          searchResult === 'Waiting' ? 'Buscando partida...' :
          searchResult === 'You are already searching for a match' ? 'Ya estás buscando partida...' :
          searchResult === 'Created' ? (
            <>
              <div>Partida creada!</div>
              <div>Oponente: {opponentUsername}</div>
              <button className="go-to-game-button" onClick={() => navigate(`/matches/${matchId}`)}>Ir a la partida</button>
            </>
          ) : 
          searchResult === 'Already' ? (
            <>
              <div>Ya estás en una partida!</div>
              <div>Oponente: {opponentUsername}</div>
              <button className="go-to-game-button" onClick={() => navigate(`/matches/${matchId}`)}>Ir a la partida</button>
            </>
          ) :
          'Error!'
        }
      </h1>
    </>
  );
};

export default Search;
