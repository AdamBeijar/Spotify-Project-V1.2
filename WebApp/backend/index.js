const express = require("express")
const fs = require("fs")
const app = express()
const SpotifyWebApi = require("spotify-web-api-node")
let request = require('request')
let querystring = require('querystring')
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
const dataPath = "U:/SpotifyProjectV1.2/SpotifyBot/json/"
app.get("/json/daily", (req, res) => {
    res.send(JSON.parse(fs.readFileSync(dataPath+"daily.json", "utf8")))
})
app.get("/json/weekly", (req, res) => {
    res.send(JSON.parse(fs.readFileSync(dataPath+"weekly.json", "utf8")))
})
app.get("/json/monthly", (req, res) => {
    res.send(JSON.parse(fs.readFileSync(dataPath+"monthly.json", "utf8")))
})
app.get("/json/yearly", (req, res) => {
    res.send(JSON.parse(fs.readFileSync(dataPath+"yearly.json", "utf8")))
})

//vvv Spotify vvv
app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: spotifyApi.getClientId(),
            scope: 'user-read-private user-read-email user-read-playback-state user-modify-playback-state',
            redirect_uri: spotifyApi.getRedirectURI()
        }))
})
const spotifyApi = new SpotifyWebApi({
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    redirectUri: "http://localhost:3001/spotifyAPI/login",
})
app.get('/spotifyAPI/login', (req, res) => {
    let code = req.query.code || null
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: spotifyApi.getRedirectURI(),
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
                spotifyApi.getClientId().toString() + ':' + spotifyApi.getClientSecret().toString()
            ).toString('base64'))
        },
        json: true
    }
    request.post(authOptions, (error, response, body) => {
        var access_token = body.access_token
        spotifyApi.setAccessToken(access_token)
        let uri = "http://localhost:3000"
        res.redirect(uri)
    })
})
app.get("/spotifyAPI/getCurrentSong", (req, res)=> {
    spotifyApi.getMyCurrentPlayingTrack()
        .then(result => {
            res.json(result.body.item)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post("/spotifyAPI/addToQueue/:id", (req, res)=> {
    const uri= `spotify:track:${req.params.id}`
    spotifyApi.addToQueue(uri)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)