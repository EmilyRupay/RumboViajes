export default function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div className="alerta alerta--error" role="alert">
      <p>
        <strong>Ups, algo salió mal.</strong> {mensaje}
      </p>
      {onReintentar && (
        <button className="btn btn--secundario btn--sm" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}
