
import './PenguinCard.css';

const PenguinCard = ({ card, selectCard, selected, selectable }) => {
  return (
    <div className={`penguin-card selectable ${selected ? 'selected' : ''}`} onClick={() => ( selectable ? selectCard(card) : null )}>
      <div className='card-type'>{card.type.charAt(0).toUpperCase() + card.type.slice(1)}</div>
      <div className='card-value'>{card.value}</div>
    </div>
  )
};

export default PenguinCard;
