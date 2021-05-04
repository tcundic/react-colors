import logo from '../assets/logo.svg';
import useRandomColor from '../hooks/useRandomColor';
import '../styles/App.css';
import {useReducer} from "react";
import combineReducers from "react-combine-reducers";
import buttonColorReducer from '../reducers/buttonColor';
import colorsListReducer from '../reducers/colorsList';
import addColor from '../actions/colorsList';
import setButtonColor from '../actions/buttonColor';

function App() {
  const [getNextColor] = useRandomColor();

  const [stateReducer, initialState] = combineReducers({
    buttonColor: [buttonColorReducer, '#fff'],
    colors: [colorsListReducer, new Set()]
  });

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleNewColor = newColor => {
    newColor.then(color => {
      dispatch(addColor(`#${color}`));
      dispatch(setButtonColor(`#${color}`));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="300" />
        <div>
          <button style={{ color: state.buttonColor }} className="button is-link" onClick={() => handleNewColor(getNextColor())}>Get some color</button>
        </div>
        <div>
          <div className="title has-text-white mt-5">Colors used:</div>
          <div className="colors-list is-flex is-flex-direction-column">
            {[...state.colors].map(color => 
              <div className={`is-size-4 ${color === state.buttonColor ? 'has-text-weight-bold' : 'has-text-weight-light'}`} style={{ color }} key={color}>
                {color}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
