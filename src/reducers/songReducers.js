import { GET_SONG_DETAILS } from "../constants/songConstants";

export const playSongReducer = (state = {},action) => {
    switch (action.type) {
        case GET_SONG_DETAILS:
            return {songDetails: action.payload}
        default:
            return state;
    }
}