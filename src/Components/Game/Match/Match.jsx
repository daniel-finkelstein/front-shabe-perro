
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './../../../auth/AuthContext';
import Cookies from 'js-cookie';
import './Match.css';
import Dice from './Dice/Dice';
import Coins from './Coins/Coins';
import Board from './Board/Board'
import BattleModal from './BattleModal/BattleModal';
import { Navigate } from 'react-router-dom';

import Nav from './../../Navbar/Navbar';

// import './HomePage.css';

const Match = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const { token } = useContext(AuthContext);

  const [isReadyButtonPressed, setIsReadyButtonPressed] = useState(false);
  const [battleId, setBattleId] = useState(null);
  const [playerInBattleId, setPlayerInBattleId] = useState(null);

  const [board, setBoard] = useState([]);
  const [matchInfo, setMatchInfo] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('battle', battleId);
  }, [battleId]);

  useEffect(() => {
    localStorage.setItem('playerInBattleId', playerInBattleId);
    Cookies.set('playerInBattleId', playerInBattleId, { expires: 1, path: '/' });
  }, [playerInBattleId]);

  useEffect(() => {
    localStorage.setItem('matchInfo', matchInfo);
  }, [matchInfo])

  useEffect(() => {
    if (!token) {
      navigate('/');
      return null;
    }
  
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    })
      .then(response => {
        console.log(response);
        setMatchInfo(response.data);
        fetchBoard();
        setIsAuthorized(true);
        if (response.data.playerInBattle) {
          setPlayerInBattleId(response.data.playerInBattle.id);
          navigate(`/matches/${response.data.match.id}/battles/${response.data.playerInBattle.battleId}`)
        }
      })
      .catch(error => {
        console.log(error);
        console.log('Authentication error');
        setIsAuthorized(false);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  useEffect(() => {
    console.log(matchInfo)
  }, [matchInfo]);

  const fetchBoard = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
      return; 
    }
    try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/board`, {
      headers: {
      Authorization: `Bearer ${token}`,
      },}
    );
    setBoard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleRoll(diceValue) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
      navigate('/login');
      return; 
    }
    const threwDice = matchInfo.player.threwDice;
    if (threwDice) {
      console.log("El jugador ya tiro.");
      return;
    }
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}`,
        { diceValue: diceValue, matchId:  matchId}, // Cuerpo de la solicitud
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Incluir cookies en la solicitud
        }
      );
      console.log("pirula")
      console.log(response.data.active); //q si la wea es true entonces q redirija a home
      const newMatchInfo = { ...matchInfo };
      newMatchInfo.player.boardPosition = response.data.newPosition;
      newMatchInfo.player.threwDice  = true;
      newMatchInfo.match.state = response.data.active;
      setMatchInfo(newMatchInfo);
      if (board[response.data.newPosition-1].type === 'coins') {
        getCoins(100);
      }
      else if (board[response.data.newPosition-1].type === 'card') {
        /* TODO: Add card to player */
      }
      else if (board[response.data.newPosition-1].type === 'empty') {
        /* TODO: Add point to player */
      }
      if (matchInfo.match.state == false){
        console.log("TENEMOS UN GANADOR")
        navigate('/home');
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getCoins = (addedCoins) => {
    const newMatchInfo = { ...matchInfo };
    newMatchInfo.player.coins += addedCoins;
    setMatchInfo(newMatchInfo);
  };

  async function endTurn() {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}/end_turn`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const newMatchInfo = { ...matchInfo };
      newMatchInfo.player.inTurn = false;
      newMatchInfo.opponent.inTurn = true;
      setMatchInfo(newMatchInfo);
    } catch (error) {
      console.log(error);
    }
  }

  async function readyToBattle(selectedCards) {
    try {
      console.log(selectedCards);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}/ready_to_battle`,
        { cards: selectedCards },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (['Already', 'Created'].includes(response.data.message)) {
        setBattleId(response.data.battleId);
        setPlayerInBattleId(response.data.playerInBattleId);
        navigate(`/matches/${matchId}/battles/${response.data.battleId}`)
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsReadyButtonPressed(true);
  }

  if (isLoading) {
    console.log('Loading...')
    return (
      <>
      <header>
        <Nav title={`Partida contra (?)`}/>
      </header>
      <h1>Cargando...</h1> 
      </>
    )
  } else if (!isAuthorized) {
    return (
      <>
      <header>
        <Nav title={`Partida contra (?)`}/>
      </header>
      <h1>Surgió un error, o no estás autorizado a este recurso</h1>
      </>
    )
  } else {
    return (
      <>
      <header>
        <Nav title={`Partida contra ${localStorage.getItem('opponentUsername')}!`}/>
      </header>
      <BattleModal matchInfo={matchInfo} readyToBattle={readyToBattle} isReadyButtonPressed={isReadyButtonPressed}/>
      <div className='inline'>{ matchInfo.player.inTurn ? (
        !matchInfo.player.threwDice ?
        <h1>Es tu turno! Lanza el dado!</h1> :
        <>
          <h1>Es tu turno!</h1>
          <button onClick={endTurn}>Terminar turno</button>
        </>
      ) : <h1>Es el turno de tu oponente!</h1>
      }</div>
      <div className="board-container">
        <div className="dice-container">
          <Dice onRoll={handleRoll} matchInfo={matchInfo} />
        </div>
        <div className="coins">
          <Coins coins={matchInfo.player.coins} />
        </div>
        <Board matchInfo={matchInfo} board={board}/>
      </div>
      </>
    )
  }
};

export default Match;
