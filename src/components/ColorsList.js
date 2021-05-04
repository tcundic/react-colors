import { useContext } from "react";
import StateContext from "../context/stateContext";
import { setColors } from '../actions/colorsList';

const ColorsList = ({colors}) => {
    const {state, dispatch} = useContext(StateContext);
    let dragged = undefined;
    let over = undefined;

    const dragStart = e => {
        dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", dragged);
    };

    let placeholder = document.createElement("div");
    placeholder.className = "placeholder";

    const dragEnd = e => {
        dragged.style.display = "block";
        dragged.parentNode.removeChild(placeholder);

        let data = [...state.colors];
        let from = Number(dragged.dataset.id);
        let to = Number(over.dataset.id);

        if (from < to) {
            to--;
        }

        data.splice(to, 0, data.splice(from, 1)[0]);
        dispatch(setColors(data));
    };

    const dragOver = e => {
        e.preventDefault();
        dragged.style.display = "none";
        if (e.target.className === 'placeholder') {
            return;
        }

        over = e.target;
        e.target.parentNode.insertBefore(placeholder, e.target);
    };

    const handleColorMove = e => {
        if (e.key === "ArrowUp" && e.target.dataset.id > 0) {
            let data = [...state.colors];
            let from = Number(e.target.dataset.id);
            let to = from - 1;

            if (from < to) {
                to--;
            }

            data.splice(to, 0, data.splice(from, 1)[0]);
            dispatch(setColors(data));
        } else if (e.key === "ArrowDown") {
            let data = [...state.colors];
            let from = Number(e.target.dataset.id);
            let to = from + 1;

            data.splice(to, 0, data.splice(from, 1)[0]);
            dispatch(setColors(data));
        }
    };

    return (
        <>
          <div className="title has-text-white mt-5">Colors used:</div>
          <div className="colors-list is-flex is-flex-direction-column" onDragOver={dragOver}>
            {[...colors].map((color, index) => 
              <div
                id={color}
                tabIndex={index}
                className={`is-size-4 ${color === state.buttonColor ? 'has-text-weight-bold' : 'has-text-weight-light'}`}
                style={{ color }}
                key={index}
                draggable="true"
                data-id={index}
                onDragEnd={dragEnd}
                onDragStart={dragStart}
                onKeyDown={handleColorMove}
              >
                {color}
              </div>
            )}
          </div>
        </>
    )
};

export default ColorsList;