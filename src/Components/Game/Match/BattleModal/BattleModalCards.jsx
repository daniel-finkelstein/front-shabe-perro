
import PenguinCard from './../Card/PenguinCard';
import './BattleModalCards.css';

const BattleModalCards = ({ matchInfo, selectCard, selectedCards, isReadyButtonPressed }) => {
  // TODO

  return (
    <div className='battle-modal-cards'>
    {matchInfo.player.penguinCards.map((card) => (
      <PenguinCard key={card.id} card={card} selectCard={selectCard} selected={selectedCards.includes(card)} selectable={!isReadyButtonPressed}/>
    ))}
    </div>
  )
};

export default BattleModalCards;
