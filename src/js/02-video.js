import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

    const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = "videoplayer-current-time";

initPlayer();

const onPlay = throttle(getCurrentVideoTime, 1000)
    function getCurrentVideoTime (currentTime) {
 localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentTime))
}

player.on('timeupdate', onPlay);


function initPlayer() {
    const localVideoTime = localStorage.getItem(LOCAL_STORAGE_KEY);
    const localParcedTime = JSON.parse(localVideoTime);
    if (localVideoTime) {
        player.setCurrentTime(localParcedTime.seconds);
    }
}




