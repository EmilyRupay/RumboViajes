import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Destinos from './pages/Destinos';
import DestinoDetalle from './pages/DestinoDetalle';
import MiViaje from './pages/MiViaje';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="destinos" element={<Destinos />} />
        <Route path="destinos/:id" element={<DestinoDetalle />} />
        <Route path="mi-viaje" element={<MiViaje />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
