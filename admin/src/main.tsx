import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { makeServer } from '../mocks/server.ts';

const originalWarn = console.warn;
console.warn = (...args) => {
  const [firstArg] = args;
  if (
    typeof firstArg === 'string' &&
    args.some((arg) =>
      arg.includes(
        'If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility',
      ),
    )
  ) {
    return;
  }
  originalWarn(...args);
};

// if (import.meta.env.DEV) {
//   makeServer({ environment: 'development' });
// }

document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(<App />);
