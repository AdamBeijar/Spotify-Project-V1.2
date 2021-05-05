import React, {useEffect, useState} from "react";
import ButtonBar from "./buttonBar";
import List from "./list";
import JSONFetchService from "../../Services/JSONFetchService";
import Button from "../addToQueue";

const Songlist = (props) => {
    const [globalName, setGobalName] = useState("day")
    const [listsD, setlistD] = useState([])
    const [listsW, setlistW] = useState([])
    const [listsM, setlistM] = useState([])
    const [listsY, setlistY] = useState([])
    const [currentList, setCurrentList] = useState(listsD)
    useEffect(()=> {
        const interval = setInterval(() => {
            JSONFetchService.getDaily().then(res => {
                setlistD(res.data)
            })
            JSONFetchService.getWeekly().then(res => {
                setlistW(res.data)
            })
            JSONFetchService.getMonthly().then(res => {
                setlistM(res.data)
            })
            JSONFetchService.getYearly().then(res => {
                setlistY(res.data)
            })
        }, 1000)
        return () => clearInterval(interval)
    })
    const changeCurrentList = (name) => {
        if (name === "Daily") {
            setCurrentList(listsD)
            setGobalName("day")
        } else if (name === "Weekly") {
            setCurrentList(listsW)
            setGobalName("week")
        } else if (name === "Monthly") {
            setCurrentList(listsM)
            setGobalName("month")
        } else if (name === "Yearly") {
            setCurrentList(listsY)
            setGobalName("year")
        }
    }
    const SongListStyle = {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
    }
    return (
        <div style={props.style}>
            <p>Top 10 songs of the {globalName}:</p>
            <ButtonBar changeCurrentList={changeCurrentList}/>
            <List style={SongListStyle} currentList={currentList} HoverItem={props.HoverItem}/>
            <Button songs={currentList} name={"Add to Queue"}/>
        </div>
    )
}
export default Songlist