import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ styles }: { styles?: CSSProperties }) => (
  <Link to={'/'}>
    <img alt="logo" src="/logo.jpg" style={styles} className="w-full max-w-24" />
  </Link>
);
