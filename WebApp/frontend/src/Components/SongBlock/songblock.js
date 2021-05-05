import React, {useEffect, useState} from 'react'
import Cover from "./cover";
import Textblock from "./TextBlock/textblock";
import JSONFetchService from "../../Services/JSONFetchService";

const Songblock = (props) => {
    const [currentSong, setCurrentSong] = useState("")
    useEffect(() => {
        const interval = setInterval(()=> {
        JSONFetchService.getCurrentSong()
            .then(res => {
                console.log("pyton3")
                setCurrentSong(res.data)
            })
        },  10000)
        return () => clearInterval(interval)
    })

    return (
        <div style={props.style}>
            <Cover album={currentSong}/>
            <Textblock song={currentSong}/>
        </div>
    )
}
export default Songblock