export default function EstadoVacio({ icono = '🧭', titulo, children }) {
  return (
    <div className="vacio">
      <span className="vacio__icono" aria-hidden="true">{icono}</span>
      <h3>{titulo}</h3>
      {children}
    </div>
  );
}
