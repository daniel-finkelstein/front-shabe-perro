
import { useEffect, useState } from 'react';
import Modal from './../../../Modal/Modal';
import BattleModalCards from './BattleModalCards';


const BattleModal = ({ matchInfo, readyToBattle, isReadyButtonPressed }) => {
  const [isInBattle, setIsInBattle] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(selectedCards.length != 5 || isReadyButtonPressed)
  }, [selectedCards, isReadyButtonPressed])

  useEffect(() => {
    if (matchInfo.player) {
      setIsInBattle(matchInfo.player.boardPosition === matchInfo.opponent.boardPosition);
    }
  }, [matchInfo]);

  useEffect(() => {
    if (isInBattle) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isInBattle])

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards])

  useEffect(() => {
    if (selectedCards.length === 5) {
      localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
    }
    else {
      localStorage.setItem('selectedCards', null);
    }
  }, [selectedCards])

  const selectCard = (card) => {
    const newSelectedCards = [ ...selectedCards ];
    if (!newSelectedCards.includes(card)) {
        if (newSelectedCards.length < 5) {
            newSelectedCards.push(card);
        }
    } else {
        const pos = newSelectedCards.indexOf(card);
        newSelectedCards.splice(pos, 1);
    }
    setSelectedCards(newSelectedCards);
  }

  return (
    <Modal isVisible={isInBattle}>
      <div className='red-notice'>iBATALLA!</div>
      <p>¿Estás preparado? <span className='bold'>¡Elige 5 de tus cartas para la batalla!</span></p>
      <BattleModalCards matchInfo={matchInfo} selectCard={selectCard} selectedCards={selectedCards} isReadyButtonPressed={isReadyButtonPressed}/>
      <div className='right'>
        <button className={`button blue right ${disabled ? 'disabled' : ''}`} onClick={() => readyToBattle(selectedCards)} disabled={disabled}>¡Estoy listo!</button>
      </div>
    </Modal>
  )
};

export default BattleModal;
