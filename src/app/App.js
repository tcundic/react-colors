import logo from '../assets/logo.svg';
import useRandomColor from '../hooks/useRandomColor';
import '../styles/App.css';

function App() {
  const [getNextColor] = useRandomColor();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="300" />
        <div>
          <button className="button is-link" onClick={() => getNextColor().then(color => alert(`Next color is: ${color}`))}>Get some color</button>
        </div>
      </header>
    </div>
  );
}

export default App;
