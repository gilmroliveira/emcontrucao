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
const themeBtn = document.getElementById('theme-btn');
const carouselPlayPauseBtn = document.getElementById('carousel-play-pause');
let isPlaying = false;
let isCarouselPlaying = true;
let carouselInterval;

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
    { src: 'IMG-20250609-WA0059.jpg', caption: 'Família reunida' },
    { src: 'IMG-20250609-WA0061.jpg', caption: 'Sorriso da vovó' },
    { src: 'IMG-20250610-WA0007.jpg', caption: 'Momento especial' },
    { src: 'IMG-20250610-WA0003.jpg', caption: 'Festa junina' }
];
let currentImageIndex = 0;

// Função para formatar tempo (mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Função para carregar uma música
function loadTrack(index) {
    audioSource.src = playlist[index].file;
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
        progressBar.max = audio.duration || 100;
        durationDisplay.textContent = formatTime(audio.duration);
        progressBar.value = 0;
        currentTimeDisplay.textContent = '0:00';
    }, { once: true });
}

// Tocar/Pausar
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Tocar Música';
    } else {
        audio.play().then(() => {
            playPauseBtn.textContent = 'Pausar Música';
        }).catch(error => console.error('Erro ao tocar:', error));
    }
    isPlaying = !isPlaying;
});

// Atualizar barra de progresso
audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.currentTime) && !isNaN(audio.duration)) {
        progressBar.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }
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
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
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
    const lightboxCaption = document.getElementById('lightbox-caption');
    currentImageIndex = index;
    lightbox.classList.add('loading');
    lightboxImg.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.src = src;
    lightboxImg.onload = () => {
        lightbox.classList.remove('loading');
        lightboxImg.style.display = 'block';
    };
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
    lightbox.style.display = 'flex';
    stopCarousel();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

function changeLightboxImage(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    openLightbox(galleryImages[currentImageIndex].src, currentImageIndex);
}

// Fechar lightbox ao clicar fora da imagem
document.getElementById('lightbox').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closeLightbox();
    }
});

// Fechar lightbox com tecla Esc, navegar com setas
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('lightbox').style.display === 'flex') {
        closeLightbox();
    } else if (event.key === 'ArrowRight' && document.getElementById('lightbox').style.display === 'flex') {
        changeLightboxImage(1);
    } else if (event.key === 'ArrowLeft' && document.getElementById('lightbox').style.display === 'flex') {
        changeLightboxImage(-1);
    }
});

// Carrossel automático
function startCarousel() {
    if (isCarouselPlaying) {
        carouselInterval = setInterval(() => {
            const nextIndex = (currentImageIndex + 1) % galleryImages.length;
            openLightbox(galleryImages[nextIndex].src, nextIndex);
        }, 3000);
    }
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

carouselPlayPauseBtn.addEventListener('click', () => {
    isCarouselPlaying = !isCarouselPlaying;
    carouselPlayPauseBtn.textContent = isCarouselPlaying ? 'Pausar Carrossel' : 'Iniciar Carrossel';
    if (isCarouselPlaying) {
        startCarousel();
    } else {
        stopCarousel();
    }
});

// Iniciar carrossel ao carregar
startCarousel();

// Botão de scroll para o topo
window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Modo escuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', toggleTheme);

// Contagem regressiva
function updateCountdown() {
    const eventDate = new Date('2025-06-14T18:00:00');
    const now = new Date();
    const timeDiff = eventDate - now;

    if (timeDiff <= 0) {
        document.getElementById('countdown-timer').textContent = 'O evento começou!';
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Carregar a primeira música
loadTrack(0);