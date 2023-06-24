var audio;
var playlist = [
  "/media/mp3/aesthetics.mp3",
  "/media/mp3/thought.mp3",
  "/media/mp3/relax.mp3",
  "/media/mp3/forest.mp3",
];
var currentSongIndex = 0;

function initAudio(autoplay = true) {
    audio = new Howl({
      src: [playlist[currentSongIndex]],
      html5: true,
      onend: function () {
        playNext();
      },
      onloaderror: function () {
        console.error('Erro ao carregar o arquivo de áudio:', playlist[currentSongIndex]);
      },
      volume: 1.0
    });

  // Obter o nome do arquivo sem a extensão e com a primeira letra maiúscula
  const filePathParts = playlist[currentSongIndex].split("/");
  const fileNameWithExtension = filePathParts[filePathParts.length - 1];
  const fileNameWithoutExtension = fileNameWithExtension.replace(".mp3", "");
  const formattedSongName =
    fileNameWithoutExtension.charAt(0).toUpperCase() +
    fileNameWithoutExtension.slice(1);

  document.getElementById("currentSongName").textContent = formattedSongName;

  if (autoplay) {
    audio.once("load", function () {
      audio.play();
      document.getElementById("playPauseIcon").classList.remove("fa-play");
      document.getElementById("playPauseIcon").classList.add("fa-pause");
    });
  } else {
    audio.once("load", function () {
      document.getElementById("playPauseIcon").classList.add("fa-play");
    });
  }
}

function togglePlayPause() {
  if (audio.playing()) {
    audio.pause();
    document.getElementById("playPauseIcon").classList.remove("fa-pause");
    document.getElementById("playPauseIcon").classList.add("fa-play");
  } else {
    audio.play();
    document.getElementById("playPauseIcon").classList.remove("fa-play");
    document.getElementById("playPauseIcon").classList.add("fa-pause");
  }
}

function playNext() {
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
  }
  audio.stop();
  audio = null;
  initAudio();
  document.getElementById("playPauseIcon").classList.remove("fa-play");
  document.getElementById("playPauseIcon").classList.add("fa-pause");
}

window.addEventListener("DOMContentLoaded", function () {
  initAudio(true); // Ativa a reprodução automática inicial
});

document.getElementById("playPauseIcon").addEventListener("click", function () {
  togglePlayPause();
});

document.getElementById("nextSongIcon").addEventListener("click", function () {
  playNext();
});

var volumeRange = document.getElementById("volumeRange");
var audioVolume = document.getElementById("audioVolume");

volumeRange.addEventListener("input", function () {
  var volume = parseFloat(volumeRange.value / 100);
  audio.volume(volume);

  // Atualizar o ícone de volume com base no valor do slider
  if (volume === 0) {
    audioVolume.className = "fas fa-volume-mute";
  } else if (volume < 0.5) {
    audioVolume.className = "fas fa-volume-down";
  } else {
    audioVolume.className = "fas fa-volume-up";
  }
});


var audioControls = document.getElementById("audioControls");
var prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  
  if (prevScrollPos > currentScrollPos) {
    audioControls.style.opacity = "1";
  } else {
    audioControls.style.opacity = "0";
  }
  
  prevScrollPos = currentScrollPos;
};
