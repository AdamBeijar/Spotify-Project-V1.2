import React from 'react'
import StatusBar from "./statusBar";
import IdBar from "./idBar";
const Status = (props) =>{
    const StatusBorder = {
        ...props.style,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        padding: "3%"
    }
    return (
        <div style={props.style}>
            <div style={StatusBorder}>
                <StatusBar/>
                <IdBar />
            </div>
        </div>
    )
}
export default Status