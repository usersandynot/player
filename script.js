const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const songTitle = document.getElementById("song-title");
const playlistItems = document.querySelectorAll("#playlist li");

let currentSongIndex = 0;

// Load a song
function loadSong(index) {
  playlistItems.forEach(li => li.classList.remove("active"));

  let song = playlistItems[index];
  song.classList.add("active");

  audio.src = song.getAttribute("data-src");
  songTitle.textContent = song.textContent;
  audio.play();
  playBtn.textContent = "⏸";
}

// Play/Pause
playBtn.addEventListener("click", () => {
  if (!audio.src) {
    loadSong(currentSongIndex); // If nothing loaded, start first song
  } else if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

// Next Song
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
  loadSong(currentSongIndex);
});

// Prev Song
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
  loadSong(currentSongIndex);
});

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek Song
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Auto play next song
audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
  loadSong(currentSongIndex);
});

// Playlist Click
playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
  });
});
