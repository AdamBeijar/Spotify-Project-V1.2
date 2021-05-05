import axios from "axios";

const baseURLJSON = "/json"
const baseURLSpotifyAPI = "/spotifyAPI"

const getDaily = () => {
    return axios.get(baseURLJSON+"/daily")
}
const getWeekly = () => {
    return axios.get(baseURLJSON+"/weekly")
}
const getMonthly = () => {
    return axios.get(baseURLJSON+"/monthly")
}
const getYearly = () => {
    return axios.get(baseURLJSON+"/Yearly")
}
const getCurrentSong = () => {
    return axios.get(`${baseURLSpotifyAPI}/getCurrentSong`)
}
const addToQueue = (id) => {
    return axios.post(`${baseURLSpotifyAPI}/addToQueue/${id}`)
}

export default  { getDaily, getWeekly, getMonthly, getYearly, getCurrentSong, addToQueue }
