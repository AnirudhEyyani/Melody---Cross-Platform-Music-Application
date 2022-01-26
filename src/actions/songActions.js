import { GET_SONG_DETAILS } from "../constants/songConstants"

// synchronous redux application
export const getSongDetails = (songDetails) => {
    return {
        type: GET_SONG_DETAILS,
        payload: songDetails
    }
}