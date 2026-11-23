import Disponibilidad from './Disponibilidad';
import { formatCLP, formatFecha, formatHora, textoEscalas } from '../utils/format';

export default function VueloCard({ vuelo, seleccionado, onSeleccionar }) {
  const agotado = vuelo.asientosDisponibles === 0;
  const pocos = !agotado && vuelo.asientosDisponibles <= 5;

  return (
    <article className={`card opcion ${seleccionado ? 'is-seleccionada' : ''} ${agotado ? 'is-agotada' : ''}`}>
      <div className="opcion__cabecera">
        <div>
          <h3 className="opcion__titulo">{vuelo.aerolinea}</h3>
          <p className="opcion__meta">{vuelo.numero} · {vuelo.clase}</p>
        </div>
        <Disponibilidad agotado={agotado} pocos={pocos} cantidad={vuelo.asientosDisponibles} unidad="asientos" />
      </div>

      <div className="ruta">
        <div>
          <span className="ruta__codigo">{vuelo.origen}</span>
          <span className="ruta__hora">{formatHora(vuelo.fechaSalida)}</span>
        </div>
        <div className="ruta__linea">
          <span>{vuelo.duracion}</span>
          <span className="ruta__trazo" aria-hidden="true" />
          <span>{textoEscalas(vuelo.escalas)}</span>
        </div>
        <div className="ruta__fin">
          <span className="ruta__codigo">{vuelo.destino}</span>
        </div>
      </div>

      <dl className="opcion__fechas">
        <div><dt>Ida</dt><dd>{formatFecha(vuelo.fechaSalida)}</dd></div>
        <div><dt>Regreso</dt><dd>{formatFecha(vuelo.fechaRegreso)}</dd></div>
      </dl>

      <div className="opcion__pie">
        <div>
          <span className="precio">{formatCLP(vuelo.precio)}</span>
          <span className="precio__nota">por persona, ida y vuelta</span>
        </div>
        <button
          className={`btn ${seleccionado ? 'btn--exito' : 'btn--primario'}`}
          disabled={agotado}
          aria-pressed={seleccionado}
          onClick={() => onSeleccionar(vuelo)}
        >
          {agotado ? 'Agotado' : seleccionado ? '✓ Seleccionado' : 'Elegir vuelo'}
        </button>
      </div>
    </article>
  );
}
