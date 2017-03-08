let audio = new Audio('song.ogg');

let seekBar = document.querySelector('.seek-bar');
let playButton = document.querySelector('button.play');
let playButtonIcon = playButton.querySelector('i');
let fillBar = seekBar.querySelector('.fill');

let mouseDown = false;

playButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

audio.addEventListener('play', function () {
    playButtonIcon.className = 'ion-pause';
});

audio.addEventListener('pause', function () {
    playButtonIcon.className = 'ion-play';
});

audio.addEventListener('timeupdate', function () {
    if (mouseDown) return;

    let p = audio.currentTime / audio.duration;

    fillBar.style.width = p * 100 + '%';
});

function clamp (min, val, max) {
    return Math.min(Math.max(min, val), max);
}

function getP (e) {
    let p = (e.clientX - seekBar.offsetLeft) / seekBar.clientWidth;
    p = clamp(0, p, 1);

    return p;
}

seekBar.addEventListener('mousedown', function (e) {
    mouseDown = true;

    let p = getP(e);

    fillBar.style.width = p * 100 + '%';
});

window.addEventListener('mousemove', function (e) {
    if (!mouseDown) return;

    let p = getP(e);

    fillBar.style.width = p * 100 + '%';
});

window.addEventListener('mouseup', function (e) {
    if (!mouseDown) return;

    mouseDown = false;

    let p = getP(e);

    fillBar.style.width = p * 100 + '%';

    audio.currentTime = p * audio.duration;
});
