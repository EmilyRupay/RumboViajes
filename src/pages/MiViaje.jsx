import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useViaje } from '../context/ViajeContext';
import { CREAR_RESERVA } from '../graphql/queries';
import EstadoVacio from '../components/EstadoVacio';
import ErrorMessage from '../components/ErrorMessage';
import Estrellas from '../components/Estrellas';
import { formatCLP, formatFecha, textoEscalas } from '../utils/format';

export default function MiViaje() {
  const { plan, actualizar, limpiar } = useViaje();
  const { destino, vuelo, hotel, pasajeros, noches } = plan;
  const [crearReserva, { data, loading, error, reset }] = useMutation(CREAR_RESERVA);

  const reserva = data?.crearReserva;
  const subtotalVuelo = vuelo ? vuelo.precio * pasajeros : 0;
  const subtotalHotel = hotel ? hotel.precioNoche * noches : 0;
  const total = subtotalVuelo + subtotalHotel;
  const maxPasajeros = Math.min(vuelo?.asientosDisponibles ?? 9, 9);

  const confirmar = () =>
    crearReserva({ variables: { vueloId: vuelo.id, hotelId: hotel.id, pasajeros, noches } }).catch(
      () => {} // el error queda en `error` y se muestra en pantalla
    );

  const nuevoViaje = () => {
    reset();
    limpiar();
  };

  if (reserva) {
    return (
      <section className="contenedor seccion">
        <div className="card confirmacion">
          <div className="card__cuerpo">
            <span className="confirmacion__icono" aria-hidden="true">🎉</span>
            <h1>¡Reserva confirmada!</h1>
            <p>Tu viaje a <strong>{destino.ciudad}</strong> quedó reservado.</p>
            <p className="confirmacion__codigo">Código: <strong>{reserva.codigo}</strong></p>
            <p>Total pagado: <strong>{formatCLP(reserva.total)}</strong></p>
            <button className="btn btn--primario" onClick={nuevoViaje}>Planificar otro viaje</button>
          </div>
        </div>
      </section>
    );
  }

  if (!destino || (!vuelo && !hotel)) {
    return (
      <section className="contenedor seccion">
        <EstadoVacio icono="🧳" titulo="Tu viaje aún está vacío">
          <p>Elige un destino y selecciona un vuelo y un hotel para armar tu viaje.</p>
          <Link to="/destinos" className="btn btn--primario">Explorar destinos</Link>
        </EstadoVacio>
      </section>
    );
  }

  return (
    <section className="contenedor seccion">
      <header className="pagina__cabecera">
        <h1>Mi viaje a {destino.ciudad} {destino.bandera}</h1>
        <p>
          Revisa tu selección, ajusta pasajeros y noches, y confirma la reserva.{' '}
          <Link to={`/destinos/${destino.id}`} className="enlace">Cambiar opciones</Link>
        </p>
      </header>

      <div className="mi-viaje">
        <div className="mi-viaje__items">
          <article className="card resumen-item">
            <div className="card__cuerpo">
              <h2 className="resumen-item__tipo">✈️ Vuelo</h2>
              {vuelo ? (
                <>
                  <p className="resumen-item__titulo">{vuelo.aerolinea} · {vuelo.numero}</p>
                  <p>{vuelo.origen} → {vuelo.destino} · {textoEscalas(vuelo.escalas)} · {vuelo.clase}</p>
                  <p>{formatFecha(vuelo.fechaSalida)} — {formatFecha(vuelo.fechaRegreso)}</p>
                  <p className="resumen-item__precio">{formatCLP(vuelo.precio)} por persona</p>
                </>
              ) : (
                <p>No has elegido vuelo. <Link to={`/destinos/${destino.id}`} className="enlace">Elegir vuelo</Link></p>
              )}
            </div>
          </article>

          <article className="card resumen-item">
            <div className="card__cuerpo">
              <h2 className="resumen-item__tipo">🏨 Hotel</h2>
              {hotel ? (
                <>
                  <p className="resumen-item__titulo">{hotel.nombre}</p>
                  <p><Estrellas cantidad={hotel.estrellas} /> · {hotel.ubicacion}</p>
                  <p>Disponible del {formatFecha(hotel.disponibleDesde)} al {formatFecha(hotel.disponibleHasta)}</p>
                  <p className="resumen-item__precio">{formatCLP(hotel.precioNoche)} por noche</p>
                </>
              ) : (
                <p>No has elegido hotel. <Link to={`/destinos/${destino.id}`} className="enlace">Elegir hotel</Link></p>
              )}
            </div>
          </article>
        </div>

        <aside className="card total">
          <div className="card__cuerpo">
            <h2 className="card__titulo">Resumen</h2>

            <label className="campo">
              <span className="campo__label">Pasajeros</span>
              <input
                type="number"
                className="campo__input"
                min={1}
                max={maxPasajeros}
                value={pasajeros}
                onChange={(e) =>
                  actualizar({ pasajeros: Math.max(1, Math.min(maxPasajeros, Number(e.target.value) || 1)) })
                }
              />
            </label>
            <label className="campo">
              <span className="campo__label">Noches de hotel</span>
              <input
                type="number"
                className="campo__input"
                min={1}
                max={30}
                value={noches}
                onChange={(e) => actualizar({ noches: Math.max(1, Math.min(30, Number(e.target.value) || 1)) })}
              />
            </label>

            <dl className="total__lineas">
              <div><dt>Vuelo × {pasajeros}</dt><dd>{formatCLP(subtotalVuelo)}</dd></div>
              <div><dt>Hotel × {noches} {noches === 1 ? 'noche' : 'noches'}</dt><dd>{formatCLP(subtotalHotel)}</dd></div>
              <div className="total__final"><dt>Total</dt><dd>{formatCLP(total)}</dd></div>
            </dl>

            {error && <ErrorMessage mensaje={error.message} />}

            <button
              className="btn btn--primario btn--bloque"
              disabled={!vuelo || !hotel || loading}
              onClick={confirmar}
            >
              {loading ? 'Confirmando…' : 'Confirmar reserva'}
            </button>
            {(!vuelo || !hotel) && (
              <p className="total__aviso">Necesitas un vuelo y un hotel para reservar.</p>
            )}
            <button className="btn btn--texto btn--bloque" onClick={limpiar}>Vaciar viaje</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
