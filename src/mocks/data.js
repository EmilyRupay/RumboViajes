// Datos simulados del "backend". Los destinos se exponen vía REST y los
// vuelos y hoteles vía GraphQL (ver handlers.js).

export const destinos = [
  {
    id: 'cusco',
    ciudad: 'Cusco',
    pais: 'Perú',
    bandera: '🇵🇪',
    continente: 'Sudamérica',
    descripcion:
      'Antigua capital del Imperio inca, puerta de entrada a Machu Picchu y al Valle Sagrado.',
    clima: 'Templado de montaña',
    mejorEpoca: 'Mayo a septiembre',
    actividades: ['Machu Picchu', 'Valle Sagrado', 'Montaña de Colores', 'Barrio de San Blas'],
    color: ['#c2410c', '#f59e0b'],
  },
  {
    id: 'cancun',
    ciudad: 'Cancún',
    pais: 'México',
    bandera: '🇲🇽',
    continente: 'Norteamérica',
    descripcion:
      'Playas de arena blanca en el Caribe mexicano, cenotes y ruinas mayas a pocos kilómetros.',
    clima: 'Tropical',
    mejorEpoca: 'Diciembre a abril',
    actividades: ['Snorkel en Isla Mujeres', 'Cenotes', 'Chichén Itzá', 'Tulum'],
    color: ['#0e7490', '#22d3ee'],
  },
  {
    id: 'buenos-aires',
    ciudad: 'Buenos Aires',
    pais: 'Argentina',
    bandera: '🇦🇷',
    continente: 'Sudamérica',
    descripcion:
      'Ciudad de tango, cafés históricos, librerías y una de las escenas gastronómicas más vivas del continente.',
    clima: 'Templado húmedo',
    mejorEpoca: 'Marzo a mayo y septiembre a noviembre',
    actividades: ['Show de tango', 'Caminito en La Boca', 'Teatro Colón', 'Parrillas en Palermo'],
    color: ['#1d4ed8', '#60a5fa'],
  },
  {
    id: 'rio',
    ciudad: 'Río de Janeiro',
    pais: 'Brasil',
    bandera: '🇧🇷',
    continente: 'Sudamérica',
    descripcion:
      'Playas icónicas, el Cristo Redentor y el Pan de Azúcar, entre la selva y el océano Atlántico.',
    clima: 'Tropical',
    mejorEpoca: 'Abril a junio',
    actividades: ['Cristo Redentor', 'Pan de Azúcar', 'Playa de Copacabana', 'Escalera Selarón'],
    color: ['#15803d', '#facc15'],
  },
  {
    id: 'madrid',
    ciudad: 'Madrid',
    pais: 'España',
    bandera: '🇪🇸',
    continente: 'Europa',
    descripcion:
      'Museos de clase mundial, plazas animadas y tapas hasta tarde en la capital española.',
    clima: 'Mediterráneo continental',
    mejorEpoca: 'Abril a junio',
    actividades: ['Museo del Prado', 'Parque del Retiro', 'Palacio Real', 'Tapeo en La Latina'],
    color: ['#b91c1c', '#fbbf24'],
  },
  {
    id: 'tokio',
    ciudad: 'Tokio',
    pais: 'Japón',
    bandera: '🇯🇵',
    continente: 'Asia',
    descripcion:
      'Metrópolis donde conviven templos milenarios, barrios de neón y la mejor comida callejera.',
    clima: 'Subtropical húmedo',
    mejorEpoca: 'Marzo a mayo',
    actividades: ['Templo Senso-ji', 'Cruce de Shibuya', 'Mercado de Tsukiji', 'Monte Fuji'],
    color: ['#be185d', '#f9a8d4'],
  },
  {
    id: 'san-pedro',
    ciudad: 'San Pedro de Atacama',
    pais: 'Chile',
    bandera: '🇨🇱',
    continente: 'Sudamérica',
    descripcion:
      'Oasis en el desierto más árido del mundo, con géiseres, salares y cielos perfectos para observar estrellas.',
    clima: 'Desértico',
    mejorEpoca: 'Todo el año',
    actividades: ['Géiseres del Tatio', 'Valle de la Luna', 'Lagunas altiplánicas', 'Tour astronómico'],
    color: ['#9a3412', '#fb923c'],
  },
];

// Vuelos desde Santiago (SCL). Precios en CLP por pasajero, ida y vuelta.
export const vuelos = [
  { id: 'v1', destinoId: 'cusco', aerolinea: 'LATAM', numero: 'LA2361', origen: 'SCL', destino: 'CUZ', fechaSalida: '2026-12-12T07:40', fechaRegreso: '2026-12-19T13:10', duracion: '4 h 50 min', escalas: 1, clase: 'Económica', precio: 389000, asientosDisponibles: 14 },
  { id: 'v2', destinoId: 'cusco', aerolinea: 'Sky Airline', numero: 'H2 513', origen: 'SCL', destino: 'CUZ', fechaSalida: '2026-12-14T05:55', fechaRegreso: '2026-12-21T10:30', duracion: '5 h 30 min', escalas: 1, clase: 'Económica', precio: 312000, asientosDisponibles: 3 },
  { id: 'v3', destinoId: 'cusco', aerolinea: 'LATAM', numero: 'LA2369', origen: 'SCL', destino: 'CUZ', fechaSalida: '2027-01-08T09:15', fechaRegreso: '2027-01-15T15:00', duracion: '4 h 45 min', escalas: 1, clase: 'Premium Economy', precio: 548000, asientosDisponibles: 0 },

  { id: 'v4', destinoId: 'cancun', aerolinea: 'Copa Airlines', numero: 'CM 452', origen: 'SCL', destino: 'CUN', fechaSalida: '2026-12-20T06:10', fechaRegreso: '2026-12-30T18:45', duracion: '10 h 05 min', escalas: 1, clase: 'Económica', precio: 689000, asientosDisponibles: 9 },
  { id: 'v5', destinoId: 'cancun', aerolinea: 'LATAM', numero: 'LA 8010', origen: 'SCL', destino: 'CUN', fechaSalida: '2027-01-05T23:55', fechaRegreso: '2027-01-15T12:20', duracion: '8 h 20 min', escalas: 0, clase: 'Económica', precio: 812000, asientosDisponibles: 21 },
  { id: 'v6', destinoId: 'cancun', aerolinea: 'Aeroméxico', numero: 'AM 011', origen: 'SCL', destino: 'CUN', fechaSalida: '2027-02-02T00:35', fechaRegreso: '2027-02-12T14:00', duracion: '11 h 40 min', escalas: 1, clase: 'Económica', precio: 645000, asientosDisponibles: 5 },

  { id: 'v7', destinoId: 'buenos-aires', aerolinea: 'JetSMART', numero: 'JA 140', origen: 'SCL', destino: 'AEP', fechaSalida: '2026-12-05T08:20', fechaRegreso: '2026-12-09T21:05', duracion: '2 h 05 min', escalas: 0, clase: 'Económica', precio: 159000, asientosDisponibles: 31 },
  { id: 'v8', destinoId: 'buenos-aires', aerolinea: 'Aerolíneas Argentinas', numero: 'AR 1281', origen: 'SCL', destino: 'AEP', fechaSalida: '2026-12-11T12:45', fechaRegreso: '2026-12-15T16:30', duracion: '2 h 10 min', escalas: 0, clase: 'Económica', precio: 198000, asientosDisponibles: 12 },
  { id: 'v9', destinoId: 'buenos-aires', aerolinea: 'LATAM', numero: 'LA 425', origen: 'SCL', destino: 'EZE', fechaSalida: '2026-12-18T18:00', fechaRegreso: '2026-12-22T09:40', duracion: '2 h 15 min', escalas: 0, clase: 'Business', precio: 620000, asientosDisponibles: 2 },

  { id: 'v10', destinoId: 'rio', aerolinea: 'LATAM', numero: 'LA 752', origen: 'SCL', destino: 'GIG', fechaSalida: '2027-01-10T10:05', fechaRegreso: '2027-01-17T19:30', duracion: '4 h 25 min', escalas: 0, clase: 'Económica', precio: 435000, asientosDisponibles: 18 },
  { id: 'v11', destinoId: 'rio', aerolinea: 'GOL', numero: 'G3 7681', origen: 'SCL', destino: 'GIG', fechaSalida: '2027-01-24T06:30', fechaRegreso: '2027-01-31T22:15', duracion: '6 h 10 min', escalas: 1, clase: 'Económica', precio: 359000, asientosDisponibles: 7 },

  { id: 'v12', destinoId: 'madrid', aerolinea: 'Iberia', numero: 'IB 6830', origen: 'SCL', destino: 'MAD', fechaSalida: '2027-03-02T13:20', fechaRegreso: '2027-03-16T23:55', duracion: '13 h 05 min', escalas: 0, clase: 'Económica', precio: 1190000, asientosDisponibles: 26 },
  { id: 'v13', destinoId: 'madrid', aerolinea: 'LATAM', numero: 'LA 704', origen: 'SCL', destino: 'MAD', fechaSalida: '2027-03-09T11:50', fechaRegreso: '2027-03-23T21:40', duracion: '12 h 55 min', escalas: 0, clase: 'Premium Economy', precio: 1640000, asientosDisponibles: 4 },
  { id: 'v14', destinoId: 'madrid', aerolinea: 'Air Europa', numero: 'UX 042', origen: 'SCL', destino: 'MAD', fechaSalida: '2027-04-06T15:15', fechaRegreso: '2027-04-20T00:30', duracion: '13 h 20 min', escalas: 0, clase: 'Económica', precio: 1075000, asientosDisponibles: 0 },

  { id: 'v15', destinoId: 'tokio', aerolinea: 'Qatar Airways', numero: 'QR 774', origen: 'SCL', destino: 'HND', fechaSalida: '2027-03-25T22:10', fechaRegreso: '2027-04-10T08:45', duracion: '34 h 30 min', escalas: 2, clase: 'Económica', precio: 1890000, asientosDisponibles: 11 },
  { id: 'v16', destinoId: 'tokio', aerolinea: 'Delta', numero: 'DL 146', origen: 'SCL', destino: 'HND', fechaSalida: '2027-04-01T21:30', fechaRegreso: '2027-04-15T16:20', duracion: '27 h 15 min', escalas: 1, clase: 'Económica', precio: 2150000, asientosDisponibles: 6 },

  { id: 'v17', destinoId: 'san-pedro', aerolinea: 'Sky Airline', numero: 'H2 220', origen: 'SCL', destino: 'CJC', fechaSalida: '2026-12-03T06:45', fechaRegreso: '2026-12-08T19:10', duracion: '2 h 10 min', escalas: 0, clase: 'Económica', precio: 119000, asientosDisponibles: 40 },
  { id: 'v18', destinoId: 'san-pedro', aerolinea: 'LATAM', numero: 'LA 340', origen: 'SCL', destino: 'CJC', fechaSalida: '2026-12-17T10:30', fechaRegreso: '2026-12-22T14:25', duracion: '2 h 05 min', escalas: 0, clase: 'Económica', precio: 146000, asientosDisponibles: 8 },
  { id: 'v19', destinoId: 'san-pedro', aerolinea: 'JetSMART', numero: 'JA 352', origen: 'SCL', destino: 'CJC', fechaSalida: '2027-01-02T07:00', fechaRegreso: '2027-01-07T20:50', duracion: '2 h 15 min', escalas: 0, clase: 'Económica', precio: 98000, asientosDisponibles: 1 },
];

// Hoteles por destino. Precio en CLP por noche.
export const hoteles = [
  { id: 'h1', destinoId: 'cusco', nombre: 'Casa Andina Plaza', estrellas: 4, ubicacion: 'Centro histórico', precioNoche: 89000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-03-31', habitacionesDisponibles: 6, servicios: ['Desayuno', 'Wi-Fi', 'Oxígeno'], calificacion: 8.7 },
  { id: 'h2', destinoId: 'cusco', nombre: 'Hostal Pumacurco', estrellas: 2, ubicacion: 'San Blas', precioNoche: 32000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-02-28', habitacionesDisponibles: 2, servicios: ['Wi-Fi', 'Terraza'], calificacion: 8.1 },
  { id: 'h3', destinoId: 'cusco', nombre: 'Palacio del Inka', estrellas: 5, ubicacion: 'Qorikancha', precioNoche: 245000, disponibleDesde: '2027-01-10', disponibleHasta: '2027-04-30', habitacionesDisponibles: 0, servicios: ['Spa', 'Desayuno', 'Restaurante'], calificacion: 9.3 },

  { id: 'h4', destinoId: 'cancun', nombre: 'Coral Beach Resort', estrellas: 5, ubicacion: 'Zona Hotelera', precioNoche: 310000, disponibleDesde: '2026-12-15', disponibleHasta: '2027-04-15', habitacionesDisponibles: 12, servicios: ['Todo incluido', 'Piscina', 'Playa privada'], calificacion: 9.0 },
  { id: 'h5', destinoId: 'cancun', nombre: 'Hotel Xbalamqué', estrellas: 3, ubicacion: 'Centro', precioNoche: 78000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-06-30', habitacionesDisponibles: 9, servicios: ['Piscina', 'Wi-Fi'], calificacion: 7.9 },

  { id: 'h6', destinoId: 'buenos-aires', nombre: 'Palermo Soho Suites', estrellas: 4, ubicacion: 'Palermo', precioNoche: 95000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-03-31', habitacionesDisponibles: 5, servicios: ['Desayuno', 'Gimnasio', 'Wi-Fi'], calificacion: 8.9 },
  { id: 'h7', destinoId: 'buenos-aires', nombre: 'Hotel Recoleta Grand', estrellas: 5, ubicacion: 'Recoleta', precioNoche: 185000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-12-31', habitacionesDisponibles: 3, servicios: ['Spa', 'Piscina', 'Restaurante'], calificacion: 9.1 },
  { id: 'h8', destinoId: 'buenos-aires', nombre: 'San Telmo Hostel', estrellas: 2, ubicacion: 'San Telmo', precioNoche: 28000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-03-31', habitacionesDisponibles: 15, servicios: ['Wi-Fi', 'Cocina compartida'], calificacion: 8.3 },

  { id: 'h9', destinoId: 'rio', nombre: 'Copacabana Palace View', estrellas: 5, ubicacion: 'Copacabana', precioNoche: 280000, disponibleDesde: '2027-01-01', disponibleHasta: '2027-06-30', habitacionesDisponibles: 4, servicios: ['Piscina', 'Frente al mar', 'Spa'], calificacion: 9.2 },
  { id: 'h10', destinoId: 'rio', nombre: 'Pousada Santa Teresa', estrellas: 3, ubicacion: 'Santa Teresa', precioNoche: 69000, disponibleDesde: '2027-01-01', disponibleHasta: '2027-12-31', habitacionesDisponibles: 0, servicios: ['Desayuno', 'Wi-Fi'], calificacion: 8.6 },

  { id: 'h11', destinoId: 'madrid', nombre: 'Hotel Gran Vía 21', estrellas: 4, ubicacion: 'Gran Vía', precioNoche: 132000, disponibleDesde: '2027-02-01', disponibleHasta: '2027-06-30', habitacionesDisponibles: 7, servicios: ['Desayuno', 'Wi-Fi', 'Bar en azotea'], calificacion: 8.8 },
  { id: 'h12', destinoId: 'madrid', nombre: 'Hostal La Latina', estrellas: 2, ubicacion: 'La Latina', precioNoche: 58000, disponibleDesde: '2027-02-01', disponibleHasta: '2027-12-31', habitacionesDisponibles: 10, servicios: ['Wi-Fi'], calificacion: 8.0 },

  { id: 'h13', destinoId: 'tokio', nombre: 'Shinjuku Sky Hotel', estrellas: 4, ubicacion: 'Shinjuku', precioNoche: 148000, disponibleDesde: '2027-03-01', disponibleHasta: '2027-05-31', habitacionesDisponibles: 5, servicios: ['Wi-Fi', 'Onsen', 'Restaurante'], calificacion: 8.9 },
  { id: 'h14', destinoId: 'tokio', nombre: 'Asakusa Capsule Inn', estrellas: 2, ubicacion: 'Asakusa', precioNoche: 41000, disponibleDesde: '2027-03-01', disponibleHasta: '2027-12-31', habitacionesDisponibles: 20, servicios: ['Wi-Fi', 'Lockers'], calificacion: 8.2 },

  { id: 'h15', destinoId: 'san-pedro', nombre: 'Lodge Kimal', estrellas: 4, ubicacion: 'Centro de San Pedro', precioNoche: 165000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-03-31', habitacionesDisponibles: 4, servicios: ['Piscina', 'Desayuno', 'Tours'], calificacion: 9.0 },
  { id: 'h16', destinoId: 'san-pedro', nombre: 'Hostal Licancabur', estrellas: 2, ubicacion: 'Calle Toconao', precioNoche: 38000, disponibleDesde: '2026-12-01', disponibleHasta: '2027-12-31', habitacionesDisponibles: 6, servicios: ['Wi-Fi', 'Estacionamiento'], calificacion: 8.4 },
];
