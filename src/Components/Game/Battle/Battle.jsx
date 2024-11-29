import { useEffect, useContext, useState } from 'react';
import { AuthContext } from './../../../auth/AuthContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Battle.css';
import Penguin from './Penguin/Penguin';
import ChosenCardModal from './ChosenCardModal/ChosenCardModal';

import Nav from './../../Navbar/Navbar';


const Battle = () => {
  const navigate = useNavigate();
  const { matchId, battleId } = useParams();
  const { token } = useContext(AuthContext);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [battleInfo, setBattleInfo] = useState({});
  const [choosingCard, setChoosingCard] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);

  useEffect(() => {
      if (!token) {
        navigate('/');
        return null;
      }
      console.log(battleId);
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}/battles/${battleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      })
        .then(response => {
          console.log(response);
          setBattleInfo(response.data);
          setIsAuthorized(true);
        })
        .catch(error => {
          console.log(error);
          console.log('Authentication error');
          setIsAuthorized(false);
        })
        .finally(() => {
        setIsLoading(false)
        });
    }, [token]
  );

  useEffect(() => { 
    console.log(battleInfo);
    const newBattleInfo = { ...battleInfo };
    localStorage.setItem('battleInfo', newBattleInfo);
  }, [battleInfo]);

  useEffect(() => {
    if (battleEnded) {
      navigate(`/matches/${matchId}`);
      console.log('Battle ended');
      return;

    }
  }, [battleEnded]);

  useEffect(() => {
    if (!battleInfo || !battleInfo.playersInBattle || battleInfo.playersInBattle.length === 0) {
      console.log('No battle info or no players in battle');
      return;
    }
  
    let cont = 0;
    const playerId = Number(localStorage.getItem('playerId'));
  
    // Busca el índice del jugador actual
    const currentPlayer = battleInfo.playersInBattle.find((p) => p.playerId === playerId);
    if (!currentPlayer) {
      console.log('Player not found in battle');
      return;
    }
  
    // Recorre las cartas y cuenta las que no han sido usadas
    currentPlayer.penguinCards.forEach((card) => {
      if (card.penguinCardToBattles[0]?.state) {
        cont++;
      }
    });
  
    // Si todas las cartas están usadas, actualiza el ganador
    if (cont === 5) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}/battles/${battleId}/win`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log('Battle ended successfully:', response.data);
          setBattleEnded(true);
        })
        .catch((error) => {
          console.error('Error ending battle:', error);
        });
    }
  }, [battleInfo]);
  



  const currentPlayerId = Number(localStorage.getItem('playerId'));
  const currentPlayerIndex =
  battleInfo.playersInBattle && battleInfo.playersInBattle.length > 0
    ? battleInfo.playersInBattle.findIndex((p) => p.playerId === currentPlayerId)
    : -1;
  

  return (
    <>
      <header>
        <Nav title={`Batalla contra ${localStorage.getItem('opponentUsername')}!`} />
      </header>
      {battleInfo && battleInfo.playersInBattle ? (
        <>
          <Penguin
            currentPlayerId={Number(localStorage.getItem('playerId'))}
            player1Id={battleInfo.playersInBattle[0]?.playerId || 0}
            player2Id={battleInfo.playersInBattle[1]?.playerId || 0}
          />
          <div className="button-container">
            <button className="choose-card-button" onClick={() => setChoosingCard(true)}>
              Escoger carta
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      {choosingCard && (
        <ChosenCardModal
          cards={battleInfo.playersInBattle[currentPlayerIndex]?.penguinCards || []}
          onClose={() => setChoosingCard(false)}
          battleId={battleId}
        />
      )}
    </>
  );
}

export default Battle;