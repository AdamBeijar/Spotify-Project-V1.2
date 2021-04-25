import React, { useState } from "react";
import Button from "./button";
const ButtonBar = (props) => {
    const ButtonBarStyle = {
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
    }
    const changeSelected = (fileName) => {
        setDaily(false)
        setWeekly(false)
        setMonthly(false)
        setYearly(false)
        if (fileName === "Daily"){
            setDaily(true)
        } else if (fileName === "Weekly"){
            setWeekly(true)
        } else if (fileName === "Monthly"){
            setMonthly(true)
        } else if (fileName === "Yearly"){
            setYearly(true)
        }
    }
    const [daily, setDaily] = useState(true)
    const [weekly, setWeekly] = useState(false)
    const [monthly, setMonthly] = useState(false)
    const [yearly, setYearly] = useState(false)
    return (
        <div style={ButtonBarStyle}>
            <Button name={"Daily"} selected={daily} onClick={changeSelected} changeCurrentList={props.changeCurrentList}/>
            <Button name={"Weekly"} selected={weekly} onClick={changeSelected} changeCurrentList={props.changeCurrentList}/>
            <Button name={"Monthly"} selected={monthly} onClick={changeSelected} changeCurrentList={props.changeCurrentList}/>
            <Button name={"Yearly"} selected={yearly} onClick={changeSelected} changeCurrentList={props.changeCurrentList}/>
        </div>
    )
}
export default ButtonBar