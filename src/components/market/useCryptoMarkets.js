import { useEffect, useState } from 'react';
import { fetchCrypto, MARKET_PATH } from './cryptoApi';
export default function useCryptoMarkets() {
  const [state, setState] = useState({ coins: [], loading: true, error: '', updatedAt: null });
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      if (active) setState(s => ({ ...s, loading: s.coins.length === 0 }));
      try {
        const coins = await fetchCrypto(MARKET_PATH);
        if (active) setState({ coins, loading: false, error: '', updatedAt: new Date() });
      } catch (error) {
        if (active) setState(s => ({ ...s, loading: false, error: error.name === 'AbortError' ? 'The market request timed out. Please try again.' : error.message }));
      }
    }
    load();
    const timer = setInterval(load, 120000);
    return () => { active = false; clearInterval(timer); };
  }, [refresh]);
  return { ...state, retry: () => setRefresh(v => v + 1) };
}
