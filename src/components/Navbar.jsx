import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useViaje } from '../context/ViajeContext';

const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/destinos', label: 'Destinos' },
  { to: '/mi-viaje', label: 'Mi viaje' },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { itemsSeleccionados } = useViaje();
  const { pathname } = useLocation();

  // Cierra el menú móvil al navegar
  useEffect(() => setAbierto(false), [pathname]);

  return (
    <header className="navbar">
      <div className="contenedor navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Rumbo Viajes, ir al inicio">
          <span aria-hidden="true">✈️</span> Rumbo<strong>Viajes</strong>
        </Link>

        <button
          className="navbar__toggle"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          onClick={() => setAbierto((a) => !a)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="menu-principal" className={`navbar__links ${abierto ? 'is-open' : ''}`}>
          {enlaces.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className="navbar__link">
              {label}
              {to === '/mi-viaje' && itemsSeleccionados > 0 && (
                <span className="badge" aria-label={`${itemsSeleccionados} elementos seleccionados`}>
                  {itemsSeleccionados}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
