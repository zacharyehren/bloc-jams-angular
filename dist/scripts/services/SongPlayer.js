(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
  /**
 * @desc Pulls album from Fixtures service
 * @type {Object}
 */
    var currentAlbum = Fixtures.getAlbum();
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
    var currentBuzzObject = null;
    
/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };
    
 /**
 * @function playSong
 * @desc Private function - plays the currentBuzzObject and enables the song to play by setting it to true
 * @param {Object} song
 */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }
    
    
 /**
 * @function getSongIndex
 * @desc Private function - Returns index of song
 * @param {Object} song
 */  
   
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
  
 /**
 * @desc Identifies the current songs index
 * @type {Object} 
 */   
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
  
 /**
 * @function stopSong
 * @desc Private function - Stops song
 * @param {Object} song
 */     
    var stopSong = function(song){
      currentBuzzObject.stop();
      song.playing = null;
    }
    
 /**
 * @desc Active song object from list of songs
 * @type {Object}
 */
    SongPlayer.currentSong = null;
    
 /**
 * @function SongPlayer.play
 * @desc Public function - Tests if SongPlayer.currentSong matches the chosen song. If it doesnt, it'll set the newly chosen song and play it. If the current song matches the chosen song, it is assumed that the song was paused and will then play it
 * @param {Object} song
 */    
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);   
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
  
/**
 * @function SongPlayer.pause
 * @desc Public function - This will only be enabled if the song is playing. It pauses the currentBuzzObject and stops the song from playing by setting it to false. 
 * @param {Object} song
 */  
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
 /**
 * @function SongPlayer.previous
 * @desc Public function - Plays the previous song
 * @param {Object} song
 */  
    SongPlayer.previous = function() {
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
   
 /**
 * @function SongPlayer.next
 * @desc Public function - Plays the next song
 * @param {Object} song
 */  
    SongPlayer.next = function() {
      currentSongIndex++;
      
      if (currentSongIndex > currentAlbum.songs.length) {
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }

    return SongPlayer;
  }
  

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();

//Current issues: When you hit next song, it automatically goes to the first track. If on the first track, it replays it the first time you hit the button. 
//If you hit previous on the first track, the track stops playing but the pause icon doesn't switch to play.