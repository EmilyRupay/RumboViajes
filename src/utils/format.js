const clp = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export const formatCLP = (valor) => clp.format(valor);

// "2026-12-12T07:40" → "sáb 12 dic 2026"
export function formatFecha(iso) {
  const [fecha] = iso.split('T');
  const [a, m, d] = fecha.split('-').map(Number);
  return new Date(a, m - 1, d).toLocaleDateString('es-CL', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// "2026-12-12T07:40" → "07:40"
export const formatHora = (iso) => iso.split('T')[1] ?? '';

export const textoEscalas = (n) => (n === 0 ? 'Directo' : n === 1 ? '1 escala' : `${n} escalas`);
