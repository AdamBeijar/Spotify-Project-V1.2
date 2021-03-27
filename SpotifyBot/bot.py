import spotipy
from spotipy.oauth2 import *
import time


class Credentials:
    def __init__(self):
        self.scopes = "user-read-currently-playing"
        self.client_secret = "36920227d76e4f8c9925832acf638a9c"
        self.redirect = "http://localhost:1234/ForumTest/tabs/test.php"
        self.sp = spotipy.Spotify(
            auth_manager=spotipy.SpotifyOAuth(
                client_secret=self.client_secret,
                redirect_uri=self.redirect,
                scope=self.scopes))


class songs:
    def __init__(self, sp):
        self.sp = sp
        self.song = self.updateSong()

    def printCurrentlyListening(self):
        return self.song[0]

    def updateSong(self):
        if self.sp.currently_playing():
            if self.sp.currently_playing()['currently_playing_type'] == "track":
                self.song = [self.sp.currently_playing()['item']['name'],
                             self.sp.currently_playing()['item']['artists'],
                             self.sp.currently_playing()['item']['album']['name'],
                             self.sp.currently_playing()['item']['id']]
                return [self.sp.currently_playing()['item']['name'], self.sp.currently_playing()['item']['artists'],
                        self.sp.currently_playing()['item']['album']['name'], self.sp.currently_playing()['item']['id']]
        return None


class currentSong(songs):
    def __init__(self, sp):
        super().__init__(sp)
        currentSongStart = 0

    def isSameAsLast(self):
        if lastSongs.firstSong:
            return False
        if self.song == lastSongs.song:
            return True
        return False

#    def updateSongTimes(self):
#        if not self.isSameAsLast():


class lastSong(songs):
    def __init__(self, sp):
        super().__init__(sp)
        self.firstSong = True

    def notFirstSong(self):
        self.firstSong = False


sp = Credentials()
currentSongs = currentSong(sp.sp)
lastSongs = lastSong(sp.sp)
while True:
    currentSongs.updateSong()
    print(currentSongs.printCurrentlyListening())
    print(currentSongs.isSameAsLast())
    lastSongs.updateSong()
    print("-------------------------")
    lastSongs.notFirstSong()
    time.sleep(2)
