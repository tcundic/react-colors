import logo from '../assets/logo.svg';
import useRandomColor from '../hooks/useRandomColor';
import '../styles/App.css';
import {useState} from "react";

function App() {
  const [getNextColor] = useRandomColor();

  const [buttonColor, setButtonColor] = useState('#fff');

  const handleNewColor = newColor => {
    newColor.then(color => {
      setButtonColor(`#${color}`);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="300" />
        <div>
          <button style={{ color: buttonColor }} className="button is-link" onClick={() => handleNewColor(getNextColor())}>Get some color</button>
        </div>
      </header>
    </div>
  );
}

export default App;
