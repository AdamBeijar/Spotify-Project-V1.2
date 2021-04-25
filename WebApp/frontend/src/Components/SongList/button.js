import React from "react";

const Button = (props) => {
    let selected;
    if (props.selected){
        selected = {
            backgroundColor: "black",
            color:"white"
        }
    } else{
        selected = {
            backgroundColor: "white"
        }
    }
    return (
        <button style={selected} onClick={()=>{
            props.onClick(props.name)
            props.changeCurrentList(props.name)
        }}>
            {props.name}
        </button>
    )
}
export default Button