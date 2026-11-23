import { useCallback, useEffect, useState } from 'react';

// Hook genérico para llamadas REST: maneja carga, error y reintento.
// `fetcher` debe ser una función que retorna una promesa.
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ejecutar = useCallback(fetcher, deps);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setError(null);

    ejecutar()
      .then((res) => !cancelado && setData(res))
      .catch((err) => !cancelado && setError(err.message))
      .finally(() => !cancelado && setLoading(false));

    // Evita actualizar estado si el componente se desmonta o cambian las dependencias
    return () => {
      cancelado = true;
    };
  }, [ejecutar, intento]);

  const reintentar = () => setIntento((n) => n + 1);

  return { data, loading, error, reintentar };
}
