// Controle da música de fundo
const audio = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause-btn');
let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Tocar Música';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pausar Música';
    }
    isPlaying = !isPlaying;
});

// Alerta ao clicar no botão do WhatsApp
document.querySelector('.whatsapp-btn').addEventListener('click', () => {
    alert('Você será redirecionado para o grupo do WhatsApp!');
});