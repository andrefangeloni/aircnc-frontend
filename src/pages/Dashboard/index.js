import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id },
      });
      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(item => (
          <li key={item._id}>
            <header style={{ backgroundImage: `url(${item.thumbnail_url})`}} />
            <strong>{item.company}</strong>
            <span>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/New">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
