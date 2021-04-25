import React, { useState } from "react";
import ButtonBar from "./buttonBar";
import List from "./list";

const Songlist = (props) => {
    const album = "21 Century Breakdown"
    const artist = "Green Day"
    const listsD =
        [{
            title: "Know Your Enemy",
            album: album,
            artist: artist
        },
        {
            title: "21 Guns",
            album: album,
            artist: artist
        },{
            title: "Murder City",
            album: album,
            artist: artist
        }]
    const listsW =
        [{
            title: "Know Your Enemy",
            album: album,
            artist: artist
        },{
            title: "21 Guns",
            album: album,
            artist: artist
        },{
            title: "Murder City",
            album: album,
            artist: artist
        },{
            title: "Restless Heart Syndrome",
            album: album,
            artist: artist
        },{
            title: "Peacemaker",
            album: album,
            artist: artist
        }]
    const listsM = [{
        title: "Know Your Enemy",
        album: album,
        artist: artist
    },{
        title: "21 Guns",
        album: album,
        artist: artist
    },{
        title: "Murder City",
        album: album,
        artist: artist
    },{
        title: "Restless Heart Syndrome",
        album: album,
        artist: artist
    },{
        title: "Peacemaker",
        album: album,
        artist: artist
    },{
        title: "The Static Age",
        album: album,
        artist: artist
    }]
    const listsY = [{
        title: "Know Your Enemy",
        album: album,
        artist: artist
    },{
        title: "21 Guns",
        album: album,
        artist: artist
    },{
        title: "Murder City",
        album: album,
        artist: artist
    },{
        title: "Restless Heart Syndrome",
        album: album,
        artist: artist
    },{
        title: "Peacemaker",
        album: album,
        artist: artist
    },{
        title: "The Static Age",
        album: album,
        artist: artist
    },{
        title: "See The Light",
        album: album,
        artist: artist
    }]
    const [currentList, setCurrentList] = useState(listsD)
    const changeCurrentList = (name) => {
        if (name === "Daily") {
            setCurrentList(listsD)
        } else if (name === "Weekly") {
            setCurrentList(listsW)
        } else if (name === "Monthly") {
            setCurrentList(listsM)
        } else if (name === "Yearly") {
            setCurrentList(listsY)
        }
    }
    const SongListStyle = {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
    }
    return (
        <div style={props.style}>
            <ButtonBar changeCurrentList={changeCurrentList}/>
            <List style={SongListStyle} currentList={currentList} HoverItem={props.HoverItem}/>
        </div>
    )
}
export default Songlist