import { getRandomColor } from "../util/apiUtils";

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