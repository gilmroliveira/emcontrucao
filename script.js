// Controle da playlist
const audio = document.getElementById('background-music');
const audioSource = document.getElementById('audio-source');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const musicSelect = document.getElementById('music-select');
let isPlaying = false;

// Lista de músicas (substitua pelos nomes reais dos seus arquivos)
const playlist = [
    { file: 'festa-junina1.mp3', title: '[Nome da Música 1]' },
    { file: 'festa-junina2.mp3', title: '[Nome da Música 2]' },
    { file: 'festa-junina3.mp3', title: '[Nome da Música 3]' }
];
let currentTrackIndex = 0;

// Função para carregar uma música
function loadTrack(index) {
    audioSource.src = playlist[index].file;
    audio.load();
    musicSelect.value = playlist[index].file;
    if (isPlaying) {
        audio.play();
    }
}

// Tocar/Pausar
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

// Música anterior
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
});

// Próxima música
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
});

// Selecionar música no menu
musicSelect.addEventListener('change', () => {
    const selectedTrack = musicSelect.value;
    currentTrackIndex = playlist.findIndex(track => track.file === selectedTrack);
    loadTrack(currentTrackIndex);
});

// Tocar próxima música automaticamente ao terminar
audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
});

// Alerta ao clicar no botão do WhatsApp
document.querySelector('.whatsapp-btn').addEventListener('click', () => {
    alert('Você será redirecionado para o grupo do WhatsApp!');
});

// Carregar a primeira música ao iniciar
loadTrack(currentTrackIndex);