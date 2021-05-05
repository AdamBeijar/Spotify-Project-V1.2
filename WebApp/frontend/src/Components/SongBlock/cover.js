import React, {useEffect, useState} from 'react'


const Cover = (props) => {
    const [image, setImage] = useState("https://via.placeholder.com/150")
    const [altText, setAltText] = useState("offline")
    const imageSize = {
        width: 250,
        height: 250,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid"
    }
    useEffect(() => {
        if(props.album.album === undefined) {
            setImage("https://via.placeholder.com/150")
        } else{
            setAltText(props.album.album.name)
            setImage(props.album.album.images[1].url)
        }
    })
    return (
        <div>
            <img style={imageSize} src={image} alt={altText}/>
        </div>
    )
}
export default Cover