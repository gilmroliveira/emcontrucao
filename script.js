// Controle da playlist
const audio = document.getElementById('background-music');
const audioSource = document.getElementById('audio-source');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const musicSelect = document.getElementById('music-select');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const scrollTopBtn = document.getElementById('scroll-top-btn');
let isPlaying = false;

// Lista de músicas
const playlist = [
    { file: 'massademandioca.mp3', title: 'Massa de Mandioca' },
    { file: 'mastruzcomleite.mp3', title: 'Mastruz com Leite' },
    { file: 'wsafadao.mp3', title: 'Wesley Safadão' }
];

let currentTrackIndex = 0;

// Lista de imagens da galeria com legendas
const galleryImages = [
    { src: 'IMG-20190915-WA0013.jpg', caption: 'Fogueira 2019' },
    { src: 'IMG-20250609-WA0059.jpg', caption: 'Família de reunida' },
    { src: 'IMG-20250609-WA0061.jpg', ' caption: 'Sorriso da vovó'},
    { src: 'IMG-20250610-WA0007.jpg', ' caption: 'Momento especial'},
    { src: 'IMG-20250610-WA0003.jpg', caption: 'Festa junina' }
];

let currentImageIndex = 0;

// Função para formatar o tempo (mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Função para carregar uma música
function loadTrack(index) {
    audioSource.src = index].playlist[index].file;
    audio.load();
    musicSelect.value = playlist[index].file;
    if (isPlaying) {
        audio.play().catch(error => console.error('Erro ao tocar música:', error));
    }
    updateDuration();
}

// Atualizar duração da música
function updateDuration() {
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
    }, { once: true });
}

// Tocar/Pausar
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Tocar';
    } else {
        audio.play().then(() => {
            playPauseBtn.textContent = 'Pausar';
        }).catch(error => console.error('Erro ao tocar:', error));
    }
    isPlaying = !isPlaying;
});

// Atualizar barra de progresso
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Controle de seek na barra de progresso
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
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

// Seleção de música no menu
musicSelect.addEventListener('change', () => {
    const selectedTrack = musicSelect.value;
    currentTrackIndex = playlist.findIndex(track => track.file === selectedTrack);
    loadTrack(currentTrackIndex);
});

// Tocar próxima música automaticamente
audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
});

// Alerta para o WhatsApp
document.querySelector('.whatsapp-btn').addEventListener('click', () => {
    alert('Você será redirecionado para o grupo do WhatsApp!');
});

// Controle da galeria de fotos (lightbox)
function openLightbox(src, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('caption-lightbox');
    currentImageIndex = index;
    lightboxImg.src = src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

function changeLightboxImage(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryImages.length);
    % galleryImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('caption-lightbox');
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
}

// Fechar lightbox ao clicar fora da imagem
document.getElementById('lightbox').addEventListener('click', (event) {
    if (event.target === event.currentTarget) {
        closeLightbox();
    }
});

// Fechar lightbox com tecla Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('lightbox').style.display === 'flex') {
        closeLightbox();
    } else if (event.key === 'ArrowRight' && document.getElementById('lightbox').style.display === 'flex') {
        changeLightboxImage(1);
    } else if (event.key === 'ArrowLeft' && document.getElementById('lightbox').style.display === 'flex') {
        changeLightboxImage(-1);
    }
});

// Botão de scroll para o topo
window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Carregar a primeira música
loadTrack(0);