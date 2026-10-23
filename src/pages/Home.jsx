import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Menu, X, Wallet, ChartNoAxesCombined, History, ChevronDown, Check } from 'lucide-react';
import Brand from '@/components/Brand';
import AuthModal from '@/components/AuthModal';
import MarketOverview, { CryptoMark } from '@/components/market/MarketOverview';
import useCryptoMarkets from '@/components/market/useCryptoMarkets';
import { usd, percent } from '@/components/market/cryptoApi';

const plans = [
  { name: 'Starter', amount: '$3,000', duration: '30 days', description: 'A straightforward place to start.', id: '01' },
  { name: 'Professional', amount: '$5,000', duration: '45 days', description: 'More room for your investment goals.', id: '02' },
  { name: 'Enterprise', amount: '$10,000', duration: '60 days', description: 'A longer horizon for your portfolio.', id: '03' },
];
const questions = [
  ['How do I get started?', 'Create an account, explore the available plans, and choose one that fits your goals. Deposits are reviewed before they appear as approved investments.'],
  ['Where do market prices come from?', 'Our market view uses public CoinGecko data, including USD prices, price history, and trading volume. Market prices are separate from your account balance and plan earnings.'],
  ['Can I see my investment history?', 'Yes. Your dashboard shows your investment plans, credited earnings, and transaction history. If an administrator creates your account, your imported deposit and daily earnings appear there too.'],
  ['What should I know before investing?', 'Crypto prices can move sharply and you can lose money. Review the plan terms, duration, and withdrawal conditions before depositing. Market charts do not predict future results.'],
];
export default function Home() {
  const [authModal, setAuthModal] = useState(null);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { coins, loading, error } = useCryptoMarkets();
  const signedIn = !!localStorage.getItem('userData');
  const openAccount = () => signedIn ? navigate('/dashboard') : setAuthModal('signup');
  return <div className="lv-home">
    <header className="lv-header"><div className="lv-container lv-nav"><Brand /><nav className="lv-desktop-nav" aria-label="Main navigation"><a href="#markets">Markets</a><a href="#how-it-works">How it works</a><a href="#plans">Investment plans</a><a href="#faq">Help centre</a></nav><div className="lv-nav-actions"><button className="lv-text-button" onClick={() => signedIn ? navigate('/dashboard') : setAuthModal('login')}>{signedIn ? 'My dashboard' : 'Log in'}</button><button className="lv-button lv-nav-cta" onClick={openAccount}>Get started <ArrowUpRight size={16} /></button><button className="lv-menu-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div></div>{menu && <nav className="lv-mobile-nav" aria-label="Mobile navigation">{[['markets','Markets'],['how-it-works','How it works'],['plans','Investment plans'],['faq','Help centre']].map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={16}/></a>)}</nav>}</header>
    <main>
      <section className="lv-container lv-hero"><div className="lv-hero-copy"><div className="lv-pill"><span />YOUR NEXT CHAPTER IN CRYPTO</div><h1>Your money.<br />Your next <span>move.</span></h1><p>A clear view of your investments, a pulse on the market, and everything you need to stay in control. Welcome to LunoVest.</p><div className="lv-hero-actions"><button className="lv-button" onClick={openAccount}>Start your journey <ArrowUpRight size={19}/></button><a className="lv-secondary-link" href="#markets">Explore the markets <ArrowRight size={17}/></a></div><div className="lv-hero-caption"><Wallet size={16}/><span>One account. A more connected view.</span></div></div>
      <div className="lv-hero-visual"><div className="lv-visual-top"><span className="lv-eyebrow">A LITTLE CLARITY GOES A LONG WAY</span><ArrowUpRight size={24}/></div><div className="lv-visual-title">Meet your<br />market view<span>.</span></div><div className="lv-preview-wallet"><div className="lv-preview-label"><span>On your watchlist</span><span className="lv-dot"/>USD</div>{loading ? <p className="lv-muted">Fetching market prices...</p> : error && !coins.length ? <p className="lv-muted">Live market prices are temporarily unavailable.</p> : coins.slice(0,3).map(coin => <div className="lv-preview-coin" key={coin.id}><CryptoMark coin={coin}/><div><strong>{coin.name}</strong><small>{coin.symbol.toUpperCase()}</small></div><div><strong>{usd(coin.current_price)}</strong><small className={coin.price_change_percentage_24h >= 0 ? 'lv-positive' : 'lv-negative'}>{percent(coin.price_change_percentage_24h)} <span>24h</span></small></div></div>)}<a href="#markets" className="lv-preview-link">Explore market data <ArrowRight size={16}/></a></div><div className="lv-visual-foot"><span>Less noise.<br/>More perspective.</span><span className="lv-visual-symbol" aria-hidden="true">&#8599;</span></div></div></section>
      <div className="lv-value-strip"><div className="lv-container"><span><ChartNoAxesCombined size={19}/>Real market insights</span><span><Wallet size={19}/>A connected portfolio</span><span><History size={19}/>Your full investment history</span></div></div>
      <div className="lv-container lv-market-wrap"><MarketOverview /></div>
      <section className="lv-how" id="how-it-works"><div className="lv-container"><div className="lv-section-heading"><div><span className="lv-eyebrow">BUILT AROUND YOU</span><h2>Keep the big picture.<br/>See the small details.</h2></div><p>A simpler way to follow your money,<br/>from your first deposit to your latest earnings.</p></div><div className="lv-feature-grid">{[
        { icon: Wallet, name:'Everything, in one place.', text:'See your invested amount, credited profits, and active plans without switching between screens.' },
        { icon: ChartNoAxesCombined, name:'Context for every move.', text:'Follow crypto prices, explore price history, and compare trading activity with public market data.' },
        { icon: History, name:'A history you can follow.', text:'Track deposits and daily earnings in a dated transaction history, right from your dashboard.' },
      ].map(({icon:Icon,name,text},i) => <article className="lv-feature" key={name}><div className="lv-feature-top"><span className="lv-icon-box"><Icon size={23}/></span><span>0{i+1}</span></div><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="lv-container lv-plans" id="plans"><div className="lv-section-heading"><div><span className="lv-eyebrow">YOUR GOALS. YOUR PACE.</span><h2>Find your starting point.</h2></div><p>Explore available investment plans.<br/>Review the terms before you commit.</p></div><div className="lv-plan-grid">{plans.map((plan,i) => <article className={`lv-plan ${i===1 ? 'lv-plan-featured' : ''}`} key={plan.name}><div className="lv-plan-top"><span>{plan.id} / {plan.name}</span>{i===1 && <span className="lv-plan-label">A longer view</span>}</div><h3>{plan.amount}<small>minimum investment</small></h3><p>{plan.description}</p><div className="lv-plan-rule"/><ul><li><Check size={16}/>{plan.duration} plan duration</li><li><Check size={16}/>Daily earnings history</li><li><Check size={16}/>Portfolio tracking</li></ul><button className={i===1 ? 'lv-button' : 'lv-button lv-button-outline'} onClick={openAccount}>Explore {plan.name}<ArrowUpRight size={17}/></button></article>)}</div><p className="lv-plan-disclaimer">Crypto investments involve risk. Plan earnings and market price movements are different measures. Review all terms and withdrawal conditions before investing.</p></section>
      <section className="lv-container lv-faq" id="faq"><div><span className="lv-eyebrow">A LITTLE MORE CLARITY</span><h2>Good questions.<br/>Clear answers.</h2><p>Get to know your next move.</p></div><div>{questions.map(([question,answer]) => <details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div></section>
      <section className="lv-container"><div className="lv-bottom-cta"><div><span className="lv-eyebrow">MAKE ROOM FOR WHAT&apos;S NEXT</span><h2>Your portfolio.<br/>A fresh perspective.</h2></div><button className="lv-button" onClick={openAccount}>Get started with LunoVest<ArrowUpRight size={19}/></button></div></section>
    </main><footer className="lv-footer lv-container"><div><Brand/><p>A clearer view of your crypto journey.</p></div><div><a href="#markets">Markets</a><a href="#plans">Plans</a><a href="#faq">Help centre</a><span>&copy; {new Date().getFullYear()} LunoVest</span></div></footer>
    <AuthModal type={authModal} onClose={() => setAuthModal(null)} />
  </div>;
}
