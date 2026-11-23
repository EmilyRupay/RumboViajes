import { createContext, useContext, useEffect, useState } from 'react';

// Guarda la planificación del viaje (destino, vuelo, hotel, pasajeros, noches)
// para compartirla entre páginas.
const ViajeContext = createContext(null);
const STORAGE_KEY = 'rumbo-viajes:plan';

const planVacio = { destino: null, vuelo: null, hotel: null, pasajeros: 1, noches: 3 };

function leerPlanGuardado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? { ...planVacio, ...JSON.parse(guardado) } : planVacio;
  } catch {
    return planVacio;
  }
}

export function ViajeProvider({ children }) {
  const [plan, setPlan] = useState(leerPlanGuardado);

  // Persiste el plan cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch {
      /* almacenamiento no disponible (modo privado, etc.) */
    }
  }, [plan]);

  // Al cambiar de destino se descartan vuelo y hotel del destino anterior
  const elegirDestino = (destino) =>
    setPlan((p) =>
      p.destino?.id === destino.id ? { ...p, destino } : { ...p, destino, vuelo: null, hotel: null }
    );

  const elegirVuelo = (destino, vuelo) => {
    elegirDestino(destino);
    setPlan((p) => ({ ...p, vuelo: p.vuelo?.id === vuelo.id ? null : vuelo }));
  };

  const elegirHotel = (destino, hotel) => {
    elegirDestino(destino);
    setPlan((p) => ({ ...p, hotel: p.hotel?.id === hotel.id ? null : hotel }));
  };

  const actualizar = (campos) => setPlan((p) => ({ ...p, ...campos }));
  const limpiar = () => setPlan(planVacio);

  const itemsSeleccionados = (plan.vuelo ? 1 : 0) + (plan.hotel ? 1 : 0);

  return (
    <ViajeContext.Provider
      value={{ plan, elegirVuelo, elegirHotel, actualizar, limpiar, itemsSeleccionados }}
    >
      {children}
    </ViajeContext.Provider>
  );
}

export function useViaje() {
  const ctx = useContext(ViajeContext);
  if (!ctx) throw new Error('useViaje debe usarse dentro de <ViajeProvider>');
  return ctx;
}
