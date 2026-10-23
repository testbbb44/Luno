import { Link } from 'react-router-dom';
import logoIcon from '@/assets/favicon.png';

export default function Brand() {
  return (
    <Link to="/" className="lv-brand" aria-label="LunoVest home">
      <img src={logoIcon} alt="" className="lv-brand-icon" width="37" height="37" />
      <span>LunoVest<span className="lv-brand-dot">.</span></span>
    </Link>
  );
}
