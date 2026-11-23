import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import useFetch from '../hooks/useFetch';
import { getDestino } from '../services/api';
import { GET_OPCIONES_VIAJE } from '../graphql/queries';
import { useViaje } from '../context/ViajeContext';
import VueloCard from '../components/VueloCard';
import HotelCard from '../components/HotelCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EstadoVacio from '../components/EstadoVacio';
import { formatCLP } from '../utils/format';

const ORDENES = {
  'precio-asc': { label: 'Precio: menor a mayor', fn: (a, b) => precio(a) - precio(b) },
  'precio-desc': { label: 'Precio: mayor a menor', fn: (a, b) => precio(b) - precio(a) },
  disponibilidad: { label: 'Más disponibilidad', fn: (a, b) => cupos(b) - cupos(a) },
};
const precio = (x) => x.precio ?? x.precioNoche;
const cupos = (x) => x.asientosDisponibles ?? x.habitacionesDisponibles;

export default function DestinoDetalle() {
  const { id } = useParams();
  const { plan, elegirVuelo, elegirHotel } = useViaje();
  const [pestana, setPestana] = useState('vuelos');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [orden, setOrden] = useState('precio-asc');

  // 1) Información general del destino → REST
  const destinoReq = useFetch(() => getDestino(id), [id]);
  const destino = destinoReq.data;

  // 2) Vuelos y hoteles del destino → GraphQL (Apollo Client)
  const { data, loading, error, refetch } = useQuery(GET_OPCIONES_VIAJE, {
    variables: { destinoId: id, soloDisponibles },
    notifyOnNetworkStatusChange: true,
  });

  const lista = useMemo(() => {
    const items = pestana === 'vuelos' ? data?.vuelos : data?.hoteles;
    return items ? [...items].sort(ORDENES[orden].fn) : [];
  }, [data, pestana, orden]);

  if (destinoReq.loading) return <div className="contenedor seccion"><Loader texto="Cargando destino…" /></div>;

  if (destinoReq.error) {
    return (
      <div className="contenedor seccion">
        <ErrorMessage mensaje={destinoReq.error} onReintentar={destinoReq.reintentar} />
        <Link to="/destinos" className="enlace">← Volver a destinos</Link>
      </div>
    );
  }

  const esEsteDestino = plan.destino?.id === destino.id;
  const vueloSel = esEsteDestino ? plan.vuelo : null;
  const hotelSel = esEsteDestino ? plan.hotel : null;

  return (
    <>
      <section
        className="destino-hero"
        style={{ background: `linear-gradient(135deg, ${destino.color[0]}, ${destino.color[1]})` }}
      >
        <div className="contenedor">
          <nav aria-label="Ruta de navegación" className="migas">
            <Link to="/">Inicio</Link> / <Link to="/destinos">Destinos</Link> / <span>{destino.ciudad}</span>
          </nav>
          <h1 className="destino-hero__titulo">
            <span aria-hidden="true">{destino.bandera}</span> {destino.ciudad}
          </h1>
          <p className="destino-hero__pais">{destino.pais} · {destino.continente}</p>
          <p className="destino-hero__desc">{destino.descripcion}</p>
        </div>
      </section>

      <div className="contenedor seccion detalle">
        <aside className="card info-destino">
          <div className="card__cuerpo">
            <h2 className="card__titulo">Sobre el destino</h2>
            <dl className="info-lista">
              <div><dt>País</dt><dd>{destino.pais}</dd></div>
              <div><dt>Clima</dt><dd>{destino.clima}</dd></div>
              <div><dt>Mejor época</dt><dd>{destino.mejorEpoca}</dd></div>
            </dl>
            <h3 className="info-destino__sub">Actividades populares</h3>
            <ul className="actividades">
              {destino.actividades.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </aside>

        <section className="opciones" aria-labelledby="titulo-opciones">
          <h2 id="titulo-opciones" className="sr-only">Opciones de viaje</h2>

          <div className="pestanas" role="tablist">
            {['vuelos', 'hoteles'].map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={pestana === p}
                className={`pestana ${pestana === p ? 'is-activa' : ''}`}
                onClick={() => setPestana(p)}
              >
                {p === 'vuelos' ? '🛫 Vuelos' : '🏨 Hoteles'}
                {data && <span className="pestana__conteo">{data[p].length}</span>}
              </button>
            ))}
          </div>

          <div className="filtros filtros--compactos">
            <label className="check">
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(e) => setSoloDisponibles(e.target.checked)}
              />
              Solo con disponibilidad
            </label>
            <label className="campo campo--inline">
              <span className="campo__label">Ordenar</span>
              <select className="campo__input" value={orden} onChange={(e) => setOrden(e.target.value)}>
                {Object.entries(ORDENES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </label>
          </div>

          {loading && <Loader texto={`Consultando ${pestana} (GraphQL)…`} />}
          {error && <ErrorMessage mensaje={error.message} onReintentar={() => refetch()} />}

          {!loading && !error && (lista.length > 0 ? (
            <div className="lista-opciones" role="tabpanel">
              {pestana === 'vuelos'
                ? lista.map((v) => (
                    <VueloCard
                      key={v.id}
                      vuelo={v}
                      seleccionado={vueloSel?.id === v.id}
                      onSeleccionar={(vuelo) => elegirVuelo(destino, vuelo)}
                    />
                  ))
                : lista.map((h) => (
                    <HotelCard
                      key={h.id}
                      hotel={h}
                      seleccionado={hotelSel?.id === h.id}
                      onSeleccionar={(hotel) => elegirHotel(destino, hotel)}
                    />
                  ))}
            </div>
          ) : (
            <EstadoVacio icono="🔍" titulo={`No hay ${pestana} disponibles`}>
              <p>Desmarca “Solo con disponibilidad” para ver todas las opciones.</p>
            </EstadoVacio>
          ))}
        </section>
      </div>

      {(vueloSel || hotelSel) && (
        <div className="barra-resumen" role="region" aria-label="Resumen de selección">
          <div className="contenedor barra-resumen__inner">
            <p>
              {vueloSel ? <>✈️ {vueloSel.aerolinea} <strong>{formatCLP(vueloSel.precio)}</strong></> : '✈️ Sin vuelo'}
              <span className="separador">·</span>
              {hotelSel ? <>🏨 {hotelSel.nombre} <strong>{formatCLP(hotelSel.precioNoche)}/noche</strong></> : '🏨 Sin hotel'}
            </p>
            <Link to="/mi-viaje" className="btn btn--primario">Continuar a mi viaje →</Link>
          </div>
        </div>
      )}
    </>
  );
}
