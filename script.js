const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles
const songs = ['again', 'answerme', 'Bryan','bryannnn', 'cowboy', 'crossed', 'Darkest Place','do not rush things', 'don\'t stop me now', 'flashh', 'got to do it', 'Haha groove', 'imdown', 'kavi', 'kazinsky', 'Lets Play', 'madamada', 'moveOn', 'no purpose', 'outstanding', 'pleased_2', 'Project_11', 'Project_29', 'Project_33', 'Project_40', 'Project_54', 'Project_68', 'Project', 'Saludji City', 'stranger', 'teddy', 'Through the night', 'To Love You', 'Tonight', 'Vice City', 'waisted', 'watizlov'];

// Keep track of songs
let songIndex = 0;

// Initially load song info DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song.toUpperCase();
    audio.src = `music/${song}.mp3`;
    cover.src = `images/saludji.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
const {duration, currentTime} = e.srcElement;
const progressPercent = (currentTime / duration) * 100;
progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
const width = this.clientWidth;
const clickX = e.offsetX;
const duration = audio.duration;

audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)