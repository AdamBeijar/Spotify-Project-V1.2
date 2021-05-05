import React from "react";
import JSONFetchService from "../Services/JSONFetchService";
const Button = (props) => {
    const buttonStyle = {
        backgroundColor: "white",
        width:"40%",
        padding:"1%"
    }
    const addSongsToQueue = (songs) => {
        let songList = songs.sort((a, b) => {
            return b.count - a.count
        })
        songList = songList.filter((item, idx) => idx < 10)
        songList.forEach(song => {
            JSONFetchService.addToQueue(song['songId'])
                .then(r => console.log(r, "song added to queue"))
        })
    }
    return (
        <button style={buttonStyle} onClick={() => addSongsToQueue(props.songs)}>
            {props.name}
        </button>
    )
}
export default Button