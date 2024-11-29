    import { useState, useContext } from 'react';
    import axios from 'axios';
    import { useParams, useNavigate } from 'react-router-dom';
    import './ChosenCardModal.css';
    import { AuthContext } from './../../../../auth/AuthContext';

    const ChosenCardModal = ({ cards, onClose }) => {
    const { matchId, battleId} = useParams();
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const { token } = useContext(AuthContext);

    const handleCardClick = (card) => {
        if (!card.penguinCardToBattles[0]?.state) {
        setSelectedCard(card);
        }
    };

    const handleBattleClick = (card) => {
        if (!card) {
            console.error('No card selected!');
            return;
        }
        if (!token) {
        console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
        navigate('/');
        return; 
        }

        axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}/battles/${battleId}/${card.id}`,
            {}, 
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
            }
        )
        .then((response) => {
        console.log('Card used successfully:', response.data);
        onClose();
        })
        .catch((error) => {
        console.error('Error using card:', error);
        });
    };

    return (
        <div className="modal-overlay">
        <div className="modal">
            <h2 className='modal-title'>Selecciona una carta para la batalla</h2>
            <div className="card-grid">
            {cards.map((card) => (
                <div
                key={card.id}
                className={`card ${card.penguinCardToBattles[0]?.state ? 'disabled' : ''} ${
                    selectedCard?.id === card.id ? 'selected' : ''
                }`}
                onClick={() => handleCardClick(card)}
                >
                <p>Tipo: {card.type}</p>
                <p>Valor: {card.value}</p>
                </div>
            ))}
            </div>
            <div className="modal-buttons">
            <button className="close-button" onClick={onClose}>
                Cancelar
            </button>
            <button
                className="battle-button"
                onClick={() => handleBattleClick(selectedCard)}
                disabled={!selectedCard}
            >
                ¡BATALLA!
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default ChosenCardModal;
