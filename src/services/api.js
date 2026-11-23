// Cliente REST para el backend mock (MSW).
// BASE_URL vale "/" en desarrollo y "/<repo>/" en GitHub Pages.
const API_URL = `${import.meta.env.BASE_URL}api`;

async function request(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    let mensaje = `Error ${res.status} al consultar el servidor`;
    try {
      const body = await res.json();
      if (body?.mensaje) mensaje = body.mensaje;
    } catch {
      /* respuesta sin JSON */
    }
    throw new Error(mensaje);
  }
  return res.json();
}

export const getDestinos = (continente) =>
  request(continente ? `/destinos?continente=${encodeURIComponent(continente)}` : '/destinos');

export const getDestino = (id) => request(`/destinos/${encodeURIComponent(id)}`);
