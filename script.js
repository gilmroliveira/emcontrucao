const audio = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause-btn');

// Garante que a música comece a tocar (caso o autoplay seja bloqueado)
document.addEventListener('DOMContentLoaded', () => {
    audio.play().catch(error => {
        console.log('Autoplay bloqueado:', error);
        // Solução alternativa: Toca na primeira interação do usuário
        document.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });
    playPauseBtn.textContent = 'Pausar Música'; // Estado inicial
});

// Alterna entre pausar e tocar ao clicar no botão
playPauseBtn.addEventListener('click', () => {
    if (!audio.paused) {
        audio.pause();
        playPauseBtn.textContent = 'Tocar Música';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pausar Música';
    }
});