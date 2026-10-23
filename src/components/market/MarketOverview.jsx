import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, RefreshCw, ChartNoAxesCombined } from 'lucide-react';
import useCryptoMarkets from './useCryptoMarkets';
import { fetchCrypto, usd, percent } from './cryptoApi';

function Sparkline({ prices, positive }) {
  if (!prices?.length) return <span className="lv-muted">No chart</span>;
  return <svg viewBox="0 0 120 36" role="img" aria-label="Seven-day price trend" className="lv-sparkline"><polyline fill="none" stroke={positive ? '#12815b' : '#ce4545'} strokeWidth="2" strokeLinejoin="round" points={prices.filter(Number.isFinite).map((value, i, values) => `${i / Math.max(1, values.length - 1) * 120},${32 - (value - Math.min(...values)) / (Math.max(...values) - Math.min(...values) || 1) * 28}`).join(' ')} /></svg>;
}
export function CryptoMark({ coin }) {
  return <span className={`lv-coin-mark lv-coin-${coin.id}`} aria-hidden="true">{coin.symbol?.toUpperCase() === 'BTC' ? '\u20bf' : coin.symbol?.toUpperCase() === 'ETH' ? '\u039e' : coin.symbol?.slice(0, 1).toUpperCase()}</span>;
}
export default function MarketOverview({ compact = false, searchQuery = "" }) {
  const { coins, loading, error, updatedAt, retry } = useCryptoMarkets();
  const matchingCoins = coins.filter(coin => `${coin.name} ${coin.symbol}`.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  const [selected, setSelected] = useState('bitcoin');
  const [period, setPeriod] = useState('7');
  const [historyRetry, setHistoryRetry] = useState(0);
  const [history, setHistory] = useState({ points: [], loading: false, error: '' });
  const coin = matchingCoins.find(c => c.id === selected) || matchingCoins[0];
  useEffect(() => {
    if (!coin) return;
    let active = true;
    setHistory({ points: [], loading: true, error: '' });
    fetchCrypto(`/coins/${coin.id}/market_chart?vs_currency=usd&days=${period}`).then(data => {
      const volumeByTime = new Map((data.total_volumes || []).map(([time, volume]) => [time, volume]));
      const points = data.prices.filter(([time, price]) => Number.isFinite(time) && Number.isFinite(price)).map(([time, price]) => ({ time, price, volume: volumeByTime.get(time) }));
      if (active) setHistory({ points, loading: false, error: points.length ? '' : 'No price history available for this range.' });
    }).catch(err => { if (active) setHistory({ points: [], loading: false, error: err.name === 'AbortError' ? 'Chart request timed out.' : err.message }); });
    return () => { active = false; };
  }, [coin?.id, period, updatedAt, historyRetry]);
  const tick = time => new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const stamp = time => new Date(time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const hasVolume = history.points.some(p => Number.isFinite(p.volume));
  const bars = history.points.filter((_, i) => i % Math.max(1, Math.ceil(history.points.length / 28)) === 0);
  return <section className={`lv-market ${compact ? 'lv-market-compact' : ''}`} aria-label="Cryptocurrency market" id="markets">
    <div className="lv-section-heading"><div><span className="lv-eyebrow">THE MARKET, AT A GLANCE</span><h2>{compact ? 'Market watch' : 'A clearer view of crypto.'}</h2></div><span className="lv-live"><span />Public market data</span></div>
    {error && <div className="lv-notice" role="status">{error} {coins.length > 0 && 'Showing the last available prices.'}<button onClick={retry}><RefreshCw size={14} />Retry</button></div>}
    {loading && <div className="lv-market-loading" role="status"><RefreshCw size={18} className="animate-spin" /> Connecting to crypto markets...</div>}
    {!loading && !error && coins.length > 0 && matchingCoins.length === 0 && <p className="lv-notice" role="status">No matching assets. Try Bitcoin, Ethereum, Solana, or BNB.</p>}
    {!loading && matchingCoins.length > 0 && <>
      <div className="lv-tickers">{matchingCoins.map(c => <button key={c.id} className={`lv-ticker ${coin?.id === c.id ? 'is-selected' : ''}`} onClick={() => setSelected(c.id)} aria-pressed={coin?.id === c.id}>
        <div className="lv-ticker-top"><CryptoMark coin={c} /><span>{c.name}<small>{c.symbol.toUpperCase()}</small></span><ArrowUpRight size={16} className="lv-muted" /></div>
        <div className="lv-ticker-price">{usd(c.current_price)}<span className={c.price_change_percentage_24h >= 0 ? 'lv-positive' : 'lv-negative'}>{percent(c.price_change_percentage_24h)}<small>24h</small></span></div>
        <Sparkline prices={c.sparkline_in_7d?.price} positive={c.price_change_percentage_7d_in_currency >= 0} />
      </button>)}</div>
      <div className="lv-market-charts"><div className="lv-price-panel">
        <div className="lv-chart-heading"><div><span className="lv-muted">{coin?.name} / USD</span><h3>{usd(coin?.current_price)}</h3><span className={coin?.price_change_percentage_24h >= 0 ? 'lv-positive' : 'lv-negative'}>{coin?.price_change_percentage_24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{percent(coin?.price_change_percentage_24h)} <span className="lv-muted">past 24h</span></span></div><div className="lv-range" aria-label="Chart time range">{[['1', '24H'], ['7', '7D'], ['30', '30D']].map(([days, label]) => <button key={days} onClick={() => setPeriod(days)} aria-pressed={period === days} className={period === days ? 'active' : ''}>{label}</button>)}</div></div>
        <div className="lv-price-chart" role="img" aria-label={`${coin?.name} USD price line chart, past ${period} days`}>
          {history.loading ? <div className="lv-chart-empty" role="status"><RefreshCw className="animate-spin" size={20} />Loading price history...</div> : history.error ? <div className="lv-chart-empty" role="status"><ChartNoAxesCombined size={28} />{history.error}<span>Current market prices are available above.</span><button className="lv-chart-retry" onClick={() => setHistoryRetry(v => v + 1)}>Retry chart</button></div> : <ResponsiveContainer width="100%" height="100%"><LineChart data={history.points} margin={{ top: 18, right: 12, bottom: 8, left: 0 }}><CartesianGrid vertical={false} stroke="#e9edf2" strokeDasharray="3 5" /><XAxis dataKey="time" tickFormatter={period === '1' ? t => new Date(t).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : tick} axisLine={false} tickLine={false} minTickGap={55} tick={{ fontSize: 11, fill: '#778294' }} /><YAxis domain={['auto', 'auto']} tickFormatter={v => usd(v, true)} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#778294' }} width={64} /><Tooltip labelFormatter={stamp} formatter={v => [usd(v), 'Price']} contentStyle={{ borderRadius: 12, border: '1px solid #e5e9ef', color: '#17202b' }} /><Line type="monotone" dataKey="price" stroke="#1458ed" strokeWidth={2.5} dot={false} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 3 }} isAnimationActive={false} /></LineChart></ResponsiveContainer>}
        </div>
      </div><div className="lv-volume-panel"><div className="lv-chart-heading"><div><span className="lv-eyebrow">TRADING ACTIVITY</span><h3>{usd(coin?.total_volume, true)}</h3><span className="lv-muted">24h trading volume</span></div><ChartNoAxesCombined size={21} /></div>
        <div className="lv-volume-chart" role="img" aria-label={`${coin?.name} rolling 24-hour USD trading volume across selected period`}>
        {history.loading ? <div className="lv-chart-empty">Loading volume...</div> : hasVolume ? <ResponsiveContainer width="100%" height="100%"><BarChart data={bars} margin={{ left: 0, right: 0 }}><CartesianGrid vertical={false} stroke="#e9edf2" /><XAxis dataKey="time" tickFormatter={tick} minTickGap={70} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#778294' }} /><Tooltip labelFormatter={stamp} formatter={v => [usd(v, true), 'Rolling 24h volume']} cursor={{ fill: '#f1f5fb' }} contentStyle={{ borderRadius: 12, border: '1px solid #e5e9ef', color: '#17202b' }} /><Bar dataKey="volume" fill="#8caff9" radius={[3, 3, 0, 0]} isAnimationActive={false} /></BarChart></ResponsiveContainer> : <div className="lv-chart-empty">Volume history unavailable</div>}
        </div><p className="lv-chart-note">Rolling 24h volume sampled across the selected period.</p><div className="lv-market-detail"><span>Market cap</span><strong>{usd(coin?.market_cap, true)}</strong></div><div className="lv-market-detail"><span>24h range</span><strong>{usd(coin?.low_24h)} - {usd(coin?.high_24h)}</strong></div>
      </div></div>
    </>}
    <div className="lv-market-source"><a href="https://www.coingecko.com/en/api" target="_blank" rel="noreferrer">Data by CoinGecko</a><span>{updatedAt ? `Fetched ${updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | refreshes every 2 min` : 'USD prices | indicative market data'}</span></div>
  </section>;
}
