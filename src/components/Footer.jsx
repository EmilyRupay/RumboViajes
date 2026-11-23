export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer__inner">
        <p>
          <strong>Rumbo Viajes</strong> · Proyecto académico Desarrollo Frontend II (PFY2202)
        </p>
        <p className="footer__nota">
          Datos simulados con Mock Service Worker: destinos vía REST, vuelos y hoteles vía GraphQL.
        </p>
      </div>
    </footer>
  );
}
