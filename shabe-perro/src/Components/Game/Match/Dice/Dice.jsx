import { useEffect, useState } from 'react';
import './Dice.css';

export default function Dice({ onRoll, matchInfo }) {
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isActive, setIsActive] = useState(matchInfo.player.inTurn & !matchInfo.player.threwDice);

  useEffect(() => {
    setIsActive(matchInfo.player.inTurn & !matchInfo.player.threwDice);
  }, [matchInfo])
  
  const rollDice = () => {
    setIsRolling(true);

    setTimeout(() => {
    const randomNumber = Math.floor(Math.random() * 6) + 1; // Número entre 1 y 6
    setDiceNumber(randomNumber);
    setIsRolling(false);
    
    // Funcion onRoll es un post al backend 
    if (onRoll) {
        onRoll(randomNumber);
    }
    }, 1000);
  };

  return (
    <div className="dice-container">
      <div className={`dice ${isRolling ? 'rolling' : ''}`} onClick={isActive ? rollDice : null} >
        <p>{isRolling ? "🎲" : diceNumber}</p>
      </div>
    </div>
  );
}
