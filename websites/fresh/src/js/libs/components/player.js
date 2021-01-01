import Plyr from 'plyr';

export function initVideoPlayers(environment) {

    const player = document.querySelector('.video-player');

    if (typeof (player) != 'undefined' && player != null) {
        if (environment === 'development') {
            const targets = document.querySelectorAll('[data-demo-poster]');
            for (var i = 0, len = targets.length; i < len; i++) {
                let poster = targets[i].getAttribute('data-demo-poster');
                if (poster !== undefined) {
                    targets[i].setAttribute('data-poster', poster);
                }
            }
            const players = Array.from(document.querySelectorAll('.video-player')).map(p => new Plyr(p));
        } else {
            const players = Array.from(document.querySelectorAll('.video-player')).map(p => new Plyr(p));
        }

    }
}