import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getDestinos } from '../services/api';
import DestinoCard from '../components/DestinoCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const pasos = [
  { icono: '🌎', titulo: 'Elige un destino', texto: 'Explora ciudades, su país y las actividades más populares.' },
  { icono: '🛫', titulo: 'Compara vuelos y hoteles', texto: 'Revisa precios, fechas y disponibilidad en tiempo real.' },
  { icono: '🧳', titulo: 'Arma tu viaje', texto: 'Calcula el total según pasajeros y noches, y reserva.' },
];

export default function Inicio() {
  const { data: destinos, loading, error, reintentar } = useFetch(() => getDestinos(), []);

  return (
    <>
      <section className="hero">
        <div className="contenedor hero__inner">
          <p className="hero__eyebrow">Agencia de viajes</p>
          <h1 className="hero__titulo">Tu próximo viaje empieza aquí</h1>
          <p className="hero__texto">
            Descubre destinos, compara vuelos desde Santiago y encuentra el hotel ideal,
            todo en un solo lugar.
          </p>
          <div className="hero__acciones">
            <Link to="/destinos" className="btn btn--primario btn--lg">Explorar destinos</Link>
            <Link to="/mi-viaje" className="btn btn--fantasma btn--lg">Ver mi viaje</Link>
          </div>
        </div>
      </section>

      <section className="contenedor seccion">
        <h2 className="seccion__titulo">¿Cómo funciona?</h2>
        <ol className="pasos">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="paso">
              <span className="paso__icono" aria-hidden="true">{p.icono}</span>
              <h3>{i + 1}. {p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="contenedor seccion">
        <div className="seccion__cabecera">
          <h2 className="seccion__titulo">Destinos destacados</h2>
          <Link to="/destinos" className="enlace">Ver todos →</Link>
        </div>
        {loading && <Loader texto="Cargando destinos…" />}
        {error && <ErrorMessage mensaje={error} onReintentar={reintentar} />}
        {destinos && (
          <div className="grilla">
            {destinos.slice(0, 3).map((d) => (
              <DestinoCard key={d.id} destino={d} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
