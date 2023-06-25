var audio;
var playlist = [
  "/media/mp3/aesthetics.mp3",
  "/media/mp3/thought.mp3",
  "/media/mp3/relax.mp3",
  "/media/mp3/forest.mp3",
];
var currentSongIndex = 0;

function initAudio() {
  audio = new Howl({
    src: [playlist[currentSongIndex]],
    html5: true,
    onend: function () {
      playNext();
    },
    onloaderror: function () {
      console.error('Erro ao carregar o arquivo de áudio:', playlist[currentSongIndex]);
    },
    volume: 1.0 // Definir volume inicial (opcional)
  });

  // Obter o nome do arquivo sem a extensão e com a primeira letra maiúscula
  const filePathParts = playlist[currentSongIndex].split("/");
  const fileNameWithExtension = filePathParts[filePathParts.length - 1];
  const fileNameWithoutExtension = fileNameWithExtension.replace(".mp3", "");
  const formattedSongName =
    fileNameWithoutExtension.charAt(0).toUpperCase() +
    fileNameWithoutExtension.slice(1);

  document.getElementById("currentSongName").textContent = formattedSongName;

  document.getElementById("playPauseIcon").classList.remove("fa-pause");
  document.getElementById("playPauseIcon").classList.add("fa-play");
}

function togglePlayPause() {
  if (!audio.playing()) {
    audio.play();
    document.getElementById("playPauseIcon").classList.remove("fa-play");
    document.getElementById("playPauseIcon").classList.add("fa-pause");
  } else {
    audio.pause();
    document.getElementById("playPauseIcon").classList.remove("fa-pause");
    document.getElementById("playPauseIcon").classList.add("fa-play");
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
  
  var playPauseIcon = document.getElementById("playPauseIcon");
  if (playPauseIcon.classList.contains("fa-play")) {
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  }
  
  audio.play(); // Play the next song automatically
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("playPauseIcon").addEventListener("click", function () {
    togglePlayPause();
  });

  document.getElementById("nextSongIcon").addEventListener("click", function () {
    playNext();
  });

  var volumeDecrease = document.getElementById("volumeDecrease");
  var volumeIncrease = document.getElementById("volumeIncrease");

  volumeDecrease.addEventListener("click", function () {
    var volume = audio.volume() - 0.1;
    if (volume < 0) {
      volume = 0;
    }
    audio.volume(volume);
  });

  volumeIncrease.addEventListener("click", function () {
    var volume = audio.volume() + 0.1;
    if (volume > 1) {
      volume = 1;
    }
    audio.volume(volume);
  });

  initAudio();
});

var prevScrollPos = window.pageYOffset;
var buttonContainer = document.getElementById("audioControls");

window.addEventListener("scroll", function() {
  var currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Rolar para cima
    buttonContainer.style.opacity = "1";
  } else {
    // Rolar para baixo
    buttonContainer.style.opacity = "0";
  }

  prevScrollPos = currentScrollPos;
});

