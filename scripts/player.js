/* YouTube API

let player;
const playerContainer = $('.player');

let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        if (playerContainer.hasClass("paused")) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);
    });

    $(".player__splash").click(e => {
        player.playVideo();
    })
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $(".player__duration-estimate").text(formatTime(durationSec));

    if (typeof interval != 'undefined') {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

const onPlayerStateChange = event => {
    switch (event.data) {
        case 1:
            playerContainer.addClass("active");
            playerContainer.addClass("paused");
            break;

        case 2:
            playerContainer.removeClass("active");
            playerContainer.removeClass("paused");
            break;
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'jNQXAC9IVRw',
        playerVars: {
            'playsinline': 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}

eventsInit();*/

const video = document.getElementById('player');
const durationControl = document.getElementById('durationLevel');
const soundControl = document.getElementById('micLevel');
const playButtons = document.querySelectorAll('.play');
const playButtonVideo = document.querySelector('.video__player-img');
const micButton = document.getElementById('mic');
const volumeButton = document.querySelector('.sound__mic');
const pauseButton = document.querySelector('.pause__img');
const playButton = document.querySelector('.duration__img');

const MAX_SOUND_VALUE = 100;
let intervalId;
let soundLevel;
const NORMAL_UPDATE_RANGE = 1000 / 66;


function setEventListeners() {

    video.addEventListener ('canplaythrough', function() {
        durationControl.max = video.duration;
    });

    playButtons.forEach((button) => {
        button.addEventListener('click', playStop);
    });

    micButton.addEventListener('click', toggleSoundValue)

    video.addEventListener('click', playStop);

    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.addEventListener('click', setVideoDuration);

    soundControl.addEventListener('mouseup', setSoundVolume)
};


function playStop() {
    playButtonVideo.classList.toggle('video__player-img--hidden');

    if (video.paused) {
        intervalId = setInterval(upateDuration, NORMAL_UPDATE_RANGE);
        upateDuration();
        video.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    } else {
        stopInterval();
        video.pause();
        pauseButton.style.display = 'none';
        playButton.style.display = 'block';
    }
};

function setVideoDuration () {
    //console.log('mouseup on range');
    intervalId = setInterval(upateDuration, NORMAL_UPDATE_RANGE);
    video.currentTime = durationControl.value;

    if(video.paused) {
        video.play();
        playButtonVideo.classList.add('video__player-img--hidden');
    }
}

function upateDuration() {
    durationControl.value = video.currentTime;
    //console.log('Обновляем range', video.currentTime);
}

function stopInterval() {
    if(!video.paused) {
        //console.log('Очищаем интервал', intervalId);
        video.pause();
        clearInterval(intervalId);
    }
}

function toggleSoundValue() {

    if (video.volume == 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * MAX_SOUND_VALUE;
        volumeButton.style.fill = 'white';
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
        volumeButton.style.fill = 'red';
    }
};

function setSoundVolume() {
    video.volume = soundControl.value / MAX_SOUND_VALUE;
    volumeButton.style.fill = 'white';
}

document.addEventListener('DOMContentLoaded', function() {

    durationControl.min = 0;
    durationControl.value = 0;

    soundControl.min = 0;
    soundControl.max = MAX_SOUND_VALUE;
    soundControl.value = MAX_SOUND_VALUE;


    setEventListeners();
});