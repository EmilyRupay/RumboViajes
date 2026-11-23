import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { ViajeProvider } from './context/ViajeContext';
import App from './App';
import './styles/index.css';

// Inicia el backend mock (MSW) antes de renderizar, para que las primeras
// llamadas REST y GraphQL ya sean interceptadas.
// Se habilita también en producción porque GitHub Pages no tiene backend real.
async function iniciarMocks() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass',
    quiet: import.meta.env.PROD,
  });
}

iniciarMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        {/* HashRouter evita errores 404 al recargar rutas en GitHub Pages */}
        <HashRouter>
          <ViajeProvider>
            <App />
          </ViajeProvider>
        </HashRouter>
      </ApolloProvider>
    </React.StrictMode>
  );
});
