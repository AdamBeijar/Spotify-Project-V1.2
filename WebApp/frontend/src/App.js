import React, { useState} from 'react'
import Title from "./Components/title"
import Songblock from "./Components/SongBlock/songblock";
import Status from "./Components/Status/status";
import Songlist from "./Components/SongList/songlist";
import Hoveritem from "./Components/SongList/hoveritem";

const App = () => {
    const [hoverItem, setHoverItem] = useState("")
    const appStyle = {
        margin: 0,
        padding: 0,
        vw: 100,
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto",
        gridTemplateRows:"20% 50% 40%",
        marginTop: "2%"
    }
    const titleStyle = {
        gridColumn: 3,
        gridRow: 1,
        textAlign: "center",
        minHeight: 100
    }
    const SongBlockStyle = {
        gridColumn: 2,
        gridRow: 2
    }
    const StatusStyle = {
        gridColumn: 4,
        gridRow: 2
    }
    const SongListStyle = {
        gridColumn: 4,
        gridRow: 3,
        minHeight: 300
    }
    const currentHoverItem = (name, hover) => {
        if(hover){
            setHoverItem(<Hoveritem song={name}/>)
        }
    }
    return (
            <div style={appStyle}>
                <Title style={titleStyle}/>
                <Songblock style={SongBlockStyle}/>
                <Status style={StatusStyle}/>
                <Songlist style={SongListStyle} HoverItem={currentHoverItem}/>
                {hoverItem}
            </div>
    )
}

export default App

