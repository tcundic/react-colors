import logo from '../assets/logo.svg';
import useRandomColor from '../hooks/useRandomColor';
import '../styles/App.css';
import {useEffect, useReducer} from "react";
import combineReducers from "react-combine-reducers";
import buttonColorReducer from '../reducers/buttonColor';
import colorsListReducer from '../reducers/colorsList';
import addColor from '../actions/colorsList';
import setButtonColor from '../actions/buttonColor';

function App() {
  const [getNextColor] = useRandomColor();

  const [stateReducer, initialState] = combineReducers({
    buttonColor: [buttonColorReducer, '#fff'],
    colors: [colorsListReducer, new Set(["#fff"])]
  });

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleNewColor = newColor => {
    newColor.then(color => {
      dispatch(addColor(`#${color}`));
      dispatch(setButtonColor(`#${color}`));
    });
  };

  useEffect(() => console.log(state), [state]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="300" />
        <div>
          <button style={{ color: state.buttonColor }} className="button is-link" onClick={() => handleNewColor(getNextColor())}>Get some color</button>
        </div>
      </header>
    </div>
  );
}

export default App;
