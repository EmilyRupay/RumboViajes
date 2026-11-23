export default function Disponibilidad({ agotado, pocos, cantidad, unidad }) {
  if (agotado) return <span className="estado estado--agotado">Sin disponibilidad</span>;
  if (pocos) return <span className="estado estado--pocos">¡Quedan {cantidad} {unidad}!</span>;
  return <span className="estado estado--ok">{cantidad} {unidad} disponibles</span>;
}
