import { http, graphql, HttpResponse, delay } from 'msw';
import { destinos, vuelos, hoteles } from './data';

// Latencia simulada para que se vean los estados de carga en la interfaz.
const LATENCIA_MS = 700;

// Agrega __typename para que Apollo Client normalice bien la caché.
const comoVuelo = (v) => ({ __typename: 'Vuelo', ...v });
const comoHotel = (h) => ({ __typename: 'Hotel', ...h });

export const handlers = [
  // ───────────────────────── REST ─────────────────────────

  // GET /api/destinos?continente=Sudamérica → lista de destinos
  http.get('*/api/destinos', async ({ request }) => {
    await delay(LATENCIA_MS);
    const url = new URL(request.url);
    const continente = url.searchParams.get('continente');

    const resultado = continente
      ? destinos.filter((d) => d.continente === continente)
      : destinos;

    return HttpResponse.json(resultado);
  }),

  // GET /api/destinos/:id → un destino (404 si no existe)
  http.get('*/api/destinos/:id', async ({ params }) => {
    await delay(LATENCIA_MS);
    const destino = destinos.find((d) => d.id === params.id);

    if (!destino) {
      return HttpResponse.json(
        { mensaje: `No existe el destino "${params.id}"` },
        { status: 404 }
      );
    }
    return HttpResponse.json(destino);
  }),

  // ──────────────────────── GraphQL ───────────────────────

  // query GetOpcionesViaje($destinoId: ID!, $soloDisponibles: Boolean)
  graphql.query('GetOpcionesViaje', async ({ variables }) => {
    await delay(LATENCIA_MS);
    const { destinoId, soloDisponibles = false } = variables;

    if (!destinos.some((d) => d.id === destinoId)) {
      return HttpResponse.json({
        errors: [{ message: `No hay opciones de viaje para el destino "${destinoId}"` }],
      });
    }

    let vuelosDestino = vuelos.filter((v) => v.destinoId === destinoId);
    let hotelesDestino = hoteles.filter((h) => h.destinoId === destinoId);

    if (soloDisponibles) {
      vuelosDestino = vuelosDestino.filter((v) => v.asientosDisponibles > 0);
      hotelesDestino = hotelesDestino.filter((h) => h.habitacionesDisponibles > 0);
    }

    return HttpResponse.json({
      data: {
        vuelos: vuelosDestino.map(comoVuelo),
        hoteles: hotelesDestino.map(comoHotel),
      },
    });
  }),

  // mutation CrearReserva($vueloId: ID!, $hotelId: ID!, $pasajeros: Int!, $noches: Int!)
  graphql.mutation('CrearReserva', async ({ variables }) => {
    await delay(LATENCIA_MS);
    const { vueloId, hotelId, pasajeros, noches } = variables;
    const vuelo = vuelos.find((v) => v.id === vueloId);
    const hotel = hoteles.find((h) => h.id === hotelId);

    if (!vuelo || !hotel) {
      return HttpResponse.json({
        errors: [{ message: 'El vuelo o el hotel seleccionado no existe.' }],
      });
    }
    if (vuelo.asientosDisponibles < pasajeros) {
      return HttpResponse.json({
        errors: [{ message: `Solo quedan ${vuelo.asientosDisponibles} asientos en el vuelo ${vuelo.numero}.` }],
      });
    }
    if (hotel.habitacionesDisponibles < 1) {
      return HttpResponse.json({
        errors: [{ message: `${hotel.nombre} no tiene habitaciones disponibles.` }],
      });
    }

    const total = vuelo.precio * pasajeros + hotel.precioNoche * noches;
    const codigo = 'RV-' + Math.random().toString(36).slice(2, 8).toUpperCase();

    return HttpResponse.json({
      data: {
        crearReserva: {
          __typename: 'Reserva',
          codigo,
          total,
          estado: 'CONFIRMADA',
        },
      },
    });
  }),
];
