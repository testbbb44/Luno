const CACHE_MS = 120000;
const cache = new Map();
const pending = new Map();
export async function fetchCrypto(path) {
  const existing = cache.get(path);
  if (existing && Date.now() - existing.at < CACHE_MS) return existing.data;
  if (pending.has(path)) return pending.get(path);
  const request = (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3${path}`, { signal: controller.signal });
      if (!response.ok) throw new Error(response.status === 429 ? 'Market data is busy. Please try again in a few minutes.' : 'Market data is temporarily unavailable.');
      const data = await response.json();
      if ((Array.isArray(data) && !data.length) || (!Array.isArray(data) && !Array.isArray(data?.prices))) throw new Error('Market data is temporarily unavailable.');
      cache.set(path, { at: Date.now(), data });
      return data;
    } finally { clearTimeout(timer); pending.delete(path); }
  })();
  pending.set(path, request);
  return request;
}
export const MARKET_PATH = '/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin&order=market_cap_desc&sparkline=true&price_change_percentage=24h,7d';
export const usd = (value, compact = false) => Number.isFinite(value) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: compact ? 'compact' : 'standard', maximumFractionDigits: compact ? 2 : 2 }).format(value) : '\u2014';
export const percent = value => Number.isFinite(value) ? `${value > 0 ? '+' : ''}${value.toFixed(2)}%` : '\u2014';
