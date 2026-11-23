import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getDestinos } from '../services/api';
import DestinoCard from '../components/DestinoCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EstadoVacio from '../components/EstadoVacio';

const CONTINENTES = ['Sudamérica', 'Norteamérica', 'Europa', 'Asia'];

export default function Destinos() {
  // El filtro de continente se guarda en la URL (?continente=...) y se envía a la API REST
  const [searchParams, setSearchParams] = useSearchParams();
  const continente = searchParams.get('continente') ?? '';
  const [busqueda, setBusqueda] = useState('');

  const { data: destinos, loading, error, reintentar } = useFetch(
    () => getDestinos(continente),
    [continente]
  );

  // La búsqueda por texto se resuelve en el cliente
  const filtrados = useMemo(() => {
    if (!destinos) return [];
    const q = busqueda.trim().toLowerCase();
    if (!q) return destinos;
    return destinos.filter((d) =>
      [d.ciudad, d.pais, ...d.actividades].some((t) => t.toLowerCase().includes(q))
    );
  }, [destinos, busqueda]);

  const cambiarContinente = (valor) =>
    setSearchParams(valor ? { continente: valor } : {});

  return (
    <section className="contenedor seccion">
      <header className="pagina__cabecera">
        <h1>Destinos disponibles</h1>
        <p>Selecciona un destino para ver sus vuelos y hoteles.</p>
      </header>

      <div className="filtros" role="search">
        <label className="campo">
          <span className="campo__label">Buscar</span>
          <input
            type="search"
            className="campo__input"
            placeholder="Ciudad, país o actividad…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>
        <label className="campo">
          <span className="campo__label">Continente</span>
          <select
            className="campo__input"
            value={continente}
            onChange={(e) => cambiarContinente(e.target.value)}
          >
            <option value="">Todos</option>
            {CONTINENTES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && <Loader texto="Consultando destinos (REST)…" />}
      {error && <ErrorMessage mensaje={error} onReintentar={reintentar} />}

      {!loading && !error && (
        <>
          <p className="resultado-conteo" aria-live="polite">
            {filtrados.length} {filtrados.length === 1 ? 'destino encontrado' : 'destinos encontrados'}
          </p>
          {filtrados.length > 0 ? (
            <div className="grilla">
              {filtrados.map((d) => (
                <DestinoCard key={d.id} destino={d} />
              ))}
            </div>
          ) : (
            <EstadoVacio titulo="No encontramos destinos">
              <p>Prueba con otra búsqueda o cambia el continente.</p>
            </EstadoVacio>
          )}
        </>
      )}
    </section>
  );
}
