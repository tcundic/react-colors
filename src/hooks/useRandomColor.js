import { getRandomColor } from "../util/APIUtils";

const useRandomColor = () => {

    const getNextColor = () => {
        return getRandomColor().then(res => {
            return res?.new_color;
        }, error => {
            alert(`Error getting random color: ${error}`);
        })
    };

    return [getNextColor];
};

export default useRandomColor;