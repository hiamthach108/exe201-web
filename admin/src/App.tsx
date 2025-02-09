import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppProviders from '@/providers/AppProviders';

function App() {
  return (
    <BrowserRouter>
      <AppProviders />
    </BrowserRouter>
  );
}

export default App;
