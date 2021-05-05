import React, {useEffect, useState} from "react";
import Titleblock from "./titleblock";
import Artist from "./artist";
import Album from "./album";

const Textblock = (props) => {
    const [title, setTitle] = useState("Offline")
    const [artist, setArtist] = useState("Offline")
    const [album, setAlbum] = useState("Offline")
    useEffect(() => {
        if(props.song.name === undefined) {
            setTitle("Offline")
            setArtist("Offline")
            setAlbum("Offline")
        } else{
            setTitle(props.song.name)
            setAlbum(props.song.album.name)
            setArtist(props.song.artists.map(a => a.name).join(", "))
        }
    })
    return (
        <div>
            <Titleblock name={title}/>
            <Artist name={artist}/>
            <Album name={album}/>
        </div>
    )
}
export default Textblock