// Controle do YouTube Music (via iframe)
let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-music', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    const playPauseBtn = document.getElementById('play-pause-btn');
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            event.target.pauseVideo();
            playPauseBtn.textContent = 'Tocar Música';
        } else {
            event.target.playVideo();
            playPauseBtn.textContent = 'Pausar Música';
        }
        isPlaying = !isPlaying;
    });
}

// Alerta ao clicar no botão do WhatsApp
document.querySelector('.whatsapp-btn').addEventListener('click', () => {
    alert('Você será redirecionado para o grupo do WhatsApp!');
});