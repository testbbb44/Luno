import { ArrowUp, ArrowDown, CreditCard, PiggyBank, Settings, Search, Eye, EyeOff, ChevronDown, Copy, ScanLine, Bell, LogOut, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoIcon from '@/assets/favicon.png';

export default function MobileWalletHome({ user, balance, loading, visible, onToggleVisibility, query, onQueryChange, onSend, canSend, onReceive, onBuy, onCopy, onLogout }) {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return <section className="lv-mobile-wallet" aria-label="Wallet overview">
    <div className="lv-wallet-topbar">
      <details className="lv-wallet-settings"><summary aria-label="Account settings"><Settings size={23} /></summary><div className="lv-wallet-popover"><strong>Account settings</strong><p>{user?.email}</p><button onClick={onToggleVisibility}>{visible ? <EyeOff size={16}/> : <Eye size={16}/>} {visible ? 'Hide balances' : 'Show balances'}</button><button onClick={onLogout}><LogOut size={16}/>Log out</button></div></details>
      <h1>Home</h1><Link to="/" aria-label="LunoVest home"><img src={logoIcon} width="27" height="27" alt="" /></Link>
    </div>
    <div className="lv-wallet-search"><Search size={20}/><input type="search" aria-label="Search crypto markets" placeholder="Search" value={query} onChange={event => onQueryChange(event.target.value)} />{query && <button aria-label="Clear search" onClick={() => onQueryChange('')}><X size={16}/></button>}</div>
    <div className="lv-wallet-account-row"><div className="lv-wallet-account">
      <div className="lv-wallet-name-row"><button onClick={onToggleVisibility} aria-label={visible ? 'Hide balances' : 'Show balances'}>{visible ? <Eye size={19}/> : <EyeOff size={19}/>}</button><details className="lv-wallet-identity"><summary><span>{[user?.firstName,user?.lastName].filter(Boolean).join(' ') || 'My account'}</span><ChevronDown size={15}/></summary><div className="lv-wallet-popover"><strong>Your investment account</strong><p>{user?.email}</p><button onClick={onCopy}><Copy size={15}/>Copy account ID</button></div></details></div>
      <div className="lv-wallet-balance" aria-live="polite">{!visible ? '******' : loading ? <span>Loading balance...</span> : new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(balance)}</div><p className="lv-wallet-balance-caption">Investment value</p>
    </div><div className="lv-wallet-tools"><button onClick={onCopy} aria-label="Copy account ID"><Copy size={18}/></button><button onClick={() => scrollTo('portfolio-performance')} aria-label="View portfolio performance"><ScanLine size={19}/></button><button onClick={() => scrollTo('transactions')} aria-label="View account activity"><Bell size={19}/></button></div></div>
    <div className="lv-wallet-actions">
      <button onClick={onSend} disabled={!canSend} aria-label="Send: withdraw earnings" title={canSend ? 'Withdraw earnings' : 'Available when you have withdrawable earnings'}><span><ArrowUp size={27} strokeWidth={2.3}/></span>Send</button>
      <button onClick={onReceive} aria-label="Receive: deposit to your investment"><span><ArrowDown size={27} strokeWidth={2.3}/></span>Receive</button>
      <button onClick={onBuy} aria-label="Buy: create an investment plan"><span><CreditCard size={26} strokeWidth={2.3}/></span>Buy</button>
      <button onClick={() => scrollTo('investments')} aria-label="Earn: view investment plans"><span><PiggyBank size={27} strokeWidth={2.3}/></span>Earn</button>
    </div>
    {query && <a className="lv-wallet-search-link" href="#markets">See market results for &ldquo;{query}&rdquo;</a>}
  </section>;
}
