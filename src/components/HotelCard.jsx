import Estrellas from './Estrellas';
import Disponibilidad from './Disponibilidad';
import { formatCLP, formatFecha } from '../utils/format';

export default function HotelCard({ hotel, seleccionado, onSeleccionar }) {
  const agotado = hotel.habitacionesDisponibles === 0;
  const pocos = !agotado && hotel.habitacionesDisponibles <= 3;

  return (
    <article className={`card opcion ${seleccionado ? 'is-seleccionada' : ''} ${agotado ? 'is-agotada' : ''}`}>
      <div className="opcion__cabecera">
        <div>
          <h3 className="opcion__titulo">{hotel.nombre}</h3>
          <p className="opcion__meta">
            <Estrellas cantidad={hotel.estrellas} /> · {hotel.ubicacion}
          </p>
        </div>
        <span className="nota" aria-label={`Calificación ${hotel.calificacion} de 10`}>
          {hotel.calificacion.toFixed(1)}
        </span>
      </div>

      <ul className="lista-chips" aria-label="Servicios">
        {hotel.servicios.map((s) => (
          <li key={s} className="chip">{s}</li>
        ))}
      </ul>

      <dl className="opcion__fechas">
        <div><dt>Disponible desde</dt><dd>{formatFecha(hotel.disponibleDesde)}</dd></div>
        <div><dt>Hasta</dt><dd>{formatFecha(hotel.disponibleHasta)}</dd></div>
      </dl>

      <Disponibilidad agotado={agotado} pocos={pocos} cantidad={hotel.habitacionesDisponibles} unidad="habitaciones" />

      <div className="opcion__pie">
        <div>
          <span className="precio">{formatCLP(hotel.precioNoche)}</span>
          <span className="precio__nota">por noche</span>
        </div>
        <button
          className={`btn ${seleccionado ? 'btn--exito' : 'btn--primario'}`}
          disabled={agotado}
          aria-pressed={seleccionado}
          onClick={() => onSeleccionar(hotel)}
        >
          {agotado ? 'Agotado' : seleccionado ? '✓ Seleccionado' : 'Elegir hotel'}
        </button>
      </div>
    </article>
  );
}
