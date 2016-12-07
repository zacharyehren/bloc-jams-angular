(function() {
  function SongPlayer() {
    var SongPlayer = {};

 /**
 * @desc Object from Fixtures (albumPicasso)
 * @type {Object}
 */
    var currentSong = null;
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
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
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
 * @function SongPlayer.play
 * @desc Public function - Tests if currentSong matches the chosen song. If it doesnt, it'll set the newly chosen song and play it. If the current song matches the chosen song, it is assumed that the song was paused and will then play it
 * @param {Object} song
 */    
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);   
        playSong(song);
      } else if (currentSong === song) {
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
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();