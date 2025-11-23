const songs = [
  {
    title: "Kaattu Payale",
    artist: "Dhee",
    src: "https://aac.saavncdn.com/030/b2e06979e927d32dcb71cbb18ce19e14_320.mp4",
    cover: "https://picsum.photos/id/1018/400/300"
  },
  {
    title: "Uyire Uyire",
    artist: "A.R. Rahman",
    src: "https://aac.saavncdn.com/510/1f4a5bc9a1f40add3521e1a50637e2b1_320.mp4",
    cover: "https://picsum.photos/id/1015/400/300"
  },
  {
    title: "Munbe Vaa",
    artist: "Shreya Ghoshal",
    src: "https://aac.saavncdn.com/690/016e65b99d9db6466b740249bca7ff6f_320.mp4",
    cover: "https://picsum.photos/id/1027/400/300"
  }
];

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlist = document.getElementById('playlist');

let index = 0;

function loadSong(i) {
  const s = songs[i];
  title.textContent = s.title;
  artist.textContent = s.artist;
  cover.src = s.cover;
  audio.src = s.src;
  updatePlaylistUI();
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶';
}

playBtn.onclick = () => {
  audio.paused ? playSong() : pauseSong();
};

nextBtn.onclick = () => {
  index = (index + 1) % songs.length;
  loadSong(index);
  playSong();
};

prevBtn.onclick = () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  playSong();
};

audio.ontimeupdate = () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + '%';

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
};

progressContainer.onclick = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
};

volumeSlider.oninput = () => audio.volume = volumeSlider.value;

audio.onended = () => nextBtn.click();

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updatePlaylistUI() {
  playlist.innerHTML = '';
  songs.forEach((song, i) => {
    const div = document.createElement('div');
    div.className = 'song' + (i === index ? ' active' : '');
    div.textContent = `${song.title} - ${song.artist}`;
    div.onclick = () => {
      index = i;
      loadSong(i);
      playSong();
    };
    playlist.appendChild(div);
  });
}

loadSong(index);
