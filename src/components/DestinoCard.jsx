import { Link } from 'react-router-dom';

export default function DestinoCard({ destino }) {
  const { id, ciudad, pais, bandera, continente, descripcion, actividades, color } = destino;

  return (
    <article className="card destino-card">
      <div
        className="destino-card__portada"
        style={{ background: `linear-gradient(135deg, ${color[0]}, ${color[1]})` }}
      >
        <span className="destino-card__bandera" aria-hidden="true">{bandera}</span>
        <span className="chip chip--claro">{continente}</span>
      </div>
      <div className="card__cuerpo">
        <h3 className="card__titulo">{ciudad}</h3>
        <p className="card__subtitulo">{pais}</p>
        <p className="destino-card__descripcion">{descripcion}</p>
        <ul className="lista-chips" aria-label="Actividades populares">
          {actividades.slice(0, 3).map((a) => (
            <li key={a} className="chip">{a}</li>
          ))}
        </ul>
        <Link to={`/destinos/${id}`} className="btn btn--primario btn--bloque">
          Ver vuelos y hoteles
        </Link>
      </div>
    </article>
  );
}
