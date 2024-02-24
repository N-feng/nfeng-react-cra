import './App.css';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

function App() {
  const outlet = useRoutes(routes)
  return (
    <div className="App">
      {outlet}
    </div>
  );
}

export default App;
