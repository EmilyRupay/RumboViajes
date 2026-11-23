import { Link } from 'react-router-dom';
import EstadoVacio from '../components/EstadoVacio';

export default function NotFound() {
  return (
    <section className="contenedor seccion">
      <EstadoVacio icono="🗺️" titulo="Página no encontrada">
        <p>Parece que esta ruta no existe. Volvamos a terreno conocido.</p>
        <Link to="/" className="btn btn--primario">Ir al inicio</Link>
      </EstadoVacio>
    </section>
  );
}
