import logo from '../assets/logo.svg';
import useRandomColor from '../hooks/useRandomColor';
import '../styles/App.css';
import {useReducer} from "react";
import combineReducers from "react-combine-reducers";
import buttonColorReducer from '../reducers/buttonColor';
import colorsListReducer from '../reducers/colorsList';
import { addColor } from '../actions/colorsList';
import setButtonColor from '../actions/buttonColor';
import ColorsList from '../components/ColorsList';
import StateContext from '../context/stateContext';

function App() {
  const [getNextColor] = useRandomColor();

  const [stateReducer, initialState] = combineReducers({
    buttonColor: [buttonColorReducer, '#fff'],
    colors: [colorsListReducer, new Set()]
  });

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleNewColor = newColor => {
    newColor.then(color => {
      if (color !== "") {
        dispatch(addColor(`#${color}`));
        dispatch(setButtonColor(`#${color}`));
      }
    });
  };

  const handleEnteredColor = e => {
    if (e.key === 'Enter') {
      if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e.target.value)) {
        dispatch(addColor(`${e.target.value}`));
        dispatch(setButtonColor(`${e.target.value}`));
      } else {
        alert('Entered color is not in a valid hex code.');
      }
    }
  };

  return (
    <StateContext.Provider value={{state, dispatch}}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="300" />
          <div>
            <button style={{ color: state.buttonColor }} className="button is-link" onClick={() => handleNewColor(getNextColor())}>Get some color</button>
          </div>
          <div>
            <ColorsList colors={state.colors}/>
            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label has-text-white">Enter color</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input className="input" type="text" placeholder="#xxxxxx" onKeyDown={handleEnteredColor} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </StateContext.Provider>
  );
}

export default App;
