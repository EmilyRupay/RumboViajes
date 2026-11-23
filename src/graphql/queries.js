import { gql } from '@apollo/client';

// Vuelos y hoteles de un destino, con precios, fechas y disponibilidad.
export const GET_OPCIONES_VIAJE = gql`
  query GetOpcionesViaje($destinoId: ID!, $soloDisponibles: Boolean) {
    vuelos(destinoId: $destinoId, soloDisponibles: $soloDisponibles) {
      id
      aerolinea
      numero
      origen
      destino
      fechaSalida
      fechaRegreso
      duracion
      escalas
      clase
      precio
      asientosDisponibles
    }
    hoteles(destinoId: $destinoId, soloDisponibles: $soloDisponibles) {
      id
      nombre
      estrellas
      ubicacion
      precioNoche
      disponibleDesde
      disponibleHasta
      habitacionesDisponibles
      servicios
      calificacion
    }
  }
`;

export const CREAR_RESERVA = gql`
  mutation CrearReserva($vueloId: ID!, $hotelId: ID!, $pasajeros: Int!, $noches: Int!) {
    crearReserva(vueloId: $vueloId, hotelId: $hotelId, pasajeros: $pasajeros, noches: $noches) {
      codigo
      total
      estado
    }
  }
`;
