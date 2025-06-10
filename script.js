// Controle da playlist
const audio = document.getElementById('background-music');
const audioSource = document.getElementById('audio-source');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const musicSelect = document.getElementById('music-select');
let isPlaying = false;

// Lista de músicas
const playlist = [
    { file: 'massademandioca.mp3', title: 'massa de mandioca' },
    { file: 'mastruzcomleite.mp3', title: 'Mastruz com Leite' },
    { file: 'wsafadao.mp3', title: 'Wesley Safadão' }
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

// Controle da galeria de fotos (lightbox)
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}