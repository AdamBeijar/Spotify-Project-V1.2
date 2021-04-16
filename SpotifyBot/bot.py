import spotipy
import datetime
from urllib3 import HTTPSConnectionPool
from utility import connector
import json
from retry import retry
import logging


def updateLogConfig():
    logging.basicConfig(filename=f"./logs/{datetime.datetime.now().date()}.log",
                        format='%(levelname)s %(asctime)s file: %(filename)s function: %(funcName)s line: %(lineno)s \n'
                               '      %(message)s', level=logging.INFO)


class Credentials:
    def __init__(self):
        self.scopes = "user-read-currently-playing"
        self.client_secret = "CLIENT_SECRET"
        self.redirect = "REDIRECT_URI"
        self.sp = spotipy.Spotify(
            auth_manager=spotipy.SpotifyOAuth(
                client_secret=self.client_secret,
                redirect_uri=self.redirect,
                scope=self.scopes,
                open_browser=False))
        self.user = self.sp.me()


class songs:
    def __init__(self, sp):
        self.sp = sp
        self.song = self.updateSong()
        self.currentPercent = 0

    def printCurrentlyListening(self):
        return self.song[0]

    @retry(exceptions=TypeError, tries=5, delay=2)
    def updateSelfSong(self):
        self.song = self.updateSong()

    def updateSong(self):
        if self.sp.currently_playing():
            if self.sp.currently_playing()['currently_playing_type'] == "track":
                self.updateSongPercentage()
                return [self.sp.currently_playing()['item']['name'], self.sp.currently_playing()['item']['artists'],
                        self.sp.currently_playing()['item']['album']['name'], self.sp.currently_playing()['item']['id']]
        return None

    def isOnline(self):
        if self.song:
            return True
        return False

    def percentageListen(self):
        currentTimeStamp = self.sp.currently_playing()['progress_ms']
        currentLength = self.sp.currently_playing()['item']['duration_ms']
        return round(currentTimeStamp / currentLength * 100, 2)


class currentSong(songs):
    def __init__(self, sp):
        super().__init__(sp)
        self.currentSongStart = 0

    def main(self):
        self.updateSelfSong()
        self.isSameAsLast()
        lastSongs.updateSelfSong()

    def isSameAsLast(self):
        if self.isOnline():
            if lastSongs.firstSong:
                self.updateLastSongAdded(False)
                self.updateSongStart()
                lastSongs.notFirstSong()
                return False
            elif self.song == lastSongs.song:
                self.timeChecks()
                self.isReadyForDB()
                return True
            self.updateLastSongAdded(False)
            self.updateSongStart()
            return False

    def isReadyForDB(self):
        if self.currentPercent - self.currentSongStart > 30 and not lastSongs.lastSongAdded[1]:
            currentDB.addToSongsDT(self.song[3], self.song[0], self.song[1], self.song[2])
            self.updateLastSongAdded(True)
            return True
        return False

    def updateLastSongAdded(self, TrueFalse):
        lastSongs.lastSongAdded = [self.song, TrueFalse]
        return True

    def updateSongStart(self):
        self.currentSongStart = self.percentageListen()

    def isRewind(self):
        if lastSongs.lastSongPercentage - self.currentPercent > 30 or self.currentPercent < self.currentSongStart:
            self.updateLastSongAdded(False)
            self.updateSongStart()
            return True
        return False

    def isSkippedForward(self):
        if self.currentPercent - lastSongs.lastSongPercentage > 10:
            self.updateLastSongAdded(False)
            self.updateSongStart()
            return True
        return False

    def timeChecks(self):
        self.isRewind()
        self.isSkippedForward()

    def updateSongPercentage(self):
        self.currentPercent = self.percentageListen()


class lastSong(songs):
    def __init__(self, sp):
        super().__init__(sp)
        self.firstSong = True
        self.lastSongAdded = [self.song, False]
        self.lastSongPercentage = 0

    def notFirstSong(self):
        self.firstSong = False

    def updateSongPercentage(self):
        self.lastSongPercentage = self.percentageListen()


class playlistClass:
    def __init__(self, sp):
        self.sp = sp
        self.playlists = self.updatePlaylists()
        self.year = self.updateYear()
        self.playlistID = self.findPlaylist()

    def updateSelfPlaylists(self):
        self.playlists = self.updatePlaylists()

    def updatePlaylists(self):
        return self.sp.current_user_playlists()

    def updatePlaylistID(self):
        self.playlistID = self.findPlaylist()

    def findPlaylist(self):
        self.updateSelfPlaylists()
        if not self.getPlaylistId():
            return self.createPlaylist()
        return self.getPlaylistId()

    def getPlaylistId(self):
        self.updateSelfYear()
        for playlistINS in self.playlists['items']:
            if playlistINS['name'] == str(self.year):
                return playlistINS['id']
        return False

    def createPlaylist(self):
        self.sp.user_playlist_create(sp.user['id'], str(self.year), False, False,
                                     f"Playlist created for {sp.user['display_name']}  most listened "
                                     f"songs of {self.year}")
        self.updateSelfPlaylists()
        logging.info(f"Created new playlist for year {self.year}")
        return self.findPlaylist()

    def updateSelfYear(self):
        self.year = self.updateYear()

    @staticmethod
    def updateYear():
        return datetime.date.today().year

    def addToPlaylist(self):
        data = currentDB.openJSONReturnData("./json/bi-weekly.json")
        correctSongs = currentDB.JSONPlaylist(data)
        currentPlaylist = self.getWholePlaylist()
        removedSongs = []
        for song in correctSongs:
            if self.isAlreadyInPlaylist(song, currentPlaylist):
                removedSongs.append(song)
        correctSongs = [x for x in correctSongs if (x not in removedSongs)]
        if len(correctSongs) > 0:
            self.sp.playlist_add_items(self.playlistID, correctSongs)
            logging.info("Added items to playlist")

    def getWholePlaylist(self):
        currentPlaylist = self.sp.playlist_items(self.playlistID)['items']
        counter = 1
        while True:
            currentLoop = self.sp.playlist_items(self.playlistID, None, 100, 100 * counter)['items']
            currentPlaylist.extend(currentLoop)
            if not len(currentLoop) == 100:
                break
            counter += 1
        return currentPlaylist

    @staticmethod
    def isAlreadyInPlaylist(song, currentPlaylist):
        for playlistSong in currentPlaylist:
            if song == playlistSong['track']['id']:
                return True
        return False


class dataBase:
    def __init__(self):
        self.cursor = connector.myCursor

    def addToSongsDT(self, songId, name, artists, album):
        artistStr = ", ".join(artist['name'] for artist in artists)
        songSql = f"INSERT INTO spotifybot.songs (userId, songId, name, artist, album) VALUES (%s, %s, %s, %s, %s )"
        songValues = (sp.user['id'], songId, name, artistStr, album)
        self.cursor.execute(songSql, songValues)
        connector.mydb.commit()
        self.updateJSONFiles()
        playlist.updateSelfPlaylists()
        playlist.addToPlaylist()

    def updateJSONFiles(self):
        unique = f"SELECT DISTINCT(songId) FROM spotifybot.songs WHERE userId = '{sp.user['id']}'"
        self.cursor.execute(unique)
        uniqueSongs = self.cursor.fetchall()
        self.initialiseJSON(uniqueSongs)

    def initialiseJSON(self, uniqueSongData):
        dates = [{
            "name": "daily",
            "date": datetime.datetime.now().date()
        }, {
            "name": "weekly",
            "date": datetime.timedelta(weeks=1)
        }, {
            "name": "bi-weekly",
            "date": datetime.timedelta(weeks=2)
        }, {
            "name": "monthly",
            "date": datetime.timedelta(days=30)
        }, {
            "name": "yearly",
            "date": datetime.timedelta(days=365)
        }]
        # 0 today, 1 every week, 2, every other week, 3 monthly, 4 yearly
        for date in dates:
            self.buildJSONFiles(date, uniqueSongData)

    def buildJSONFiles(self, date, uniqueSongData):
        uniqueSongs = []
        for song in uniqueSongData:
            currentINS = self.returnFullSongInfo(song, date['date'])
            if currentINS:
                uniqueSongs.append(currentINS)
        with open(f"./json/{date['name']}.json", "w") as currentFile:
            json.dump(uniqueSongs, currentFile)

    def returnFullSongInfo(self, uniqueSong, date):
        songSQL = f"SELECT userId, songId, name, artist, album FROM spotifybot.songs WHERE songId ='{uniqueSong['songId']}'AND" \
                  f" datetime BETWEEN '{date}' AND '{datetime.datetime.now()}' AND userId = '{sp.user['id']}'"
        self.cursor.execute(songSQL)
        connector.mydb.commit()
        song = self.cursor.fetchall()
        if self.cursor.rowcount > 0:
            song[0]["count"] = self.cursor.rowcount
            return song[0]

    @staticmethod
    def JSONPlaylist(data):
        correctSongs = []
        for item in data:
            if item['count'] > 7:
                correctSongs.append(item['songId'])
        return correctSongs

    @staticmethod
    def openJSONReturnData(path):
        with open(path, "r") as currentFile:
            data = json.load(currentFile)
            return data


try:
    updateLogConfig()
    sp = Credentials()
    currentSongs = currentSong(sp.sp)
    lastSongs = lastSong(sp.sp)
    playlist = playlistClass(sp.sp)
    currentDB = dataBase()
    logging.info("Classes created successfully")
except Exception as Error:
    logging.error(Error)
else:
    while True:
        try:
            updateLogConfig()
            currentSongs.main()
        except HTTPSConnectionPool as Error:
            logging.warning(Error)
        except Exception as Error:
            logging.error(Error)
