import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Nav from './../Navbar/Navbar';
import { AuthContext } from './../../auth/AuthContext';

import './Profile.css';

function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [favoriteBear, setFavoriteBear] = useState("");
  const [loveToDCC, setLoveToDCC] = useState(1);

  const [error, setError] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/edit`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { username, email, favoriteFood, favoriteColor, favoriteBear, loveToDCC } = response.data;
        setUsername(username || "");
        setEmail(email || "");
        setFavoriteFood(favoriteFood || "");
        setFavoriteColor(favoriteColor || "");
        setFavoriteBear(favoriteBear || "");
        setLoveToDCC(loveToDCC || 1);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(true);
      }
    }
    fetchUserData();
  }, [token]);

  // Manejo de envío
  async function handleSubmit() {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/edit`, {
        username,
        email,
        favoriteFood,
        favoriteColor,
        favoriteBear,
        loveToDCC,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setError(false);
      navigate('/home');
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(true);
    }
  }

  return (
    <>
      <header>
        <Nav title="Editar Perfil" />
      </header>
      <div className="centered-content">
        <div className="login">
          <div className={`inputs-grid ${error ? 'error' : ''}`}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Comida favorita"
              value={favoriteFood}
              onChange={(e) => setFavoriteFood(e.target.value)}
            />
            <input
              type="text"
              placeholder="Color de puffle favorito"
              value={favoriteColor}
              onChange={(e) => setFavoriteColor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Especie de oso favorita"
              value={favoriteBear}
              onChange={(e) => setFavoriteBear(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amor al DCC"
              value={loveToDCC}
              onChange={(e) => setLoveToDCC(Math.max(1, Math.min(10, Number(e.target.value))))}
            />
          </div>
          {error && <p className="error-message">Error al actualizar el perfil. Inténtalo de nuevo.</p>}
          <div className="buttons">
            <button className="button white" onClick={() => navigate(-1)}>Volver</button>
            <button
              className={`button blue ${username && email ? '' : 'disabled'}`}
              disabled={!username || !email}
              onClick={handleSubmit}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
