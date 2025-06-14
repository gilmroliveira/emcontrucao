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
const uploadBtn = document.getElementById('upload-btn');
const mediaUpload = document.getElementById('media-upload');
const uploadStatus = document.getElementById('upload-status');
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
let galleryImages = [
    { src: 'IMG-20190911-125844.jpg', caption: 'Fogueira 2019', type: 'image' },
    { src: 'IMG-20190915-WA0013.jpg', caption: 'Família reunida', type: 'image' },
    { src: 'IMG-20250609-WA0059.jpg', caption: 'Sorriso da vovó', type: 'image' },
    { src: 'IMG-20250609-WA0061.jpg', caption: 'Momento especial', type: 'image' },
    { src: 'IMG-20250610-WA0003.jpg', caption: 'Festa junina', type: 'image' },
    { src: 'IMG-20250610-WA0007.jpg', caption: 'Nova foto 1', type: 'image' },
    { src: 'IMG-20250613-WA0004.jpg', caption: 'Nova foto 2', type: 'image' },
    { src: 'IMG-20250613-WA0005.jpg', caption: 'Nova foto 3', type: 'image' },
    { src: 'IMG-20250613-WA0006.jpg', caption: 'Nova foto 4', type: 'image' },
    { src: 'IMG-20250613-WA0007.jpg', caption: 'Nova foto 5', type: 'image' },
    { src: 'IMG-20250614-WA0041.jpg', caption: 'Nova foto 6', type: 'image' },
    { src: 'IMG-20250614-WA0042.jpg', caption: 'Nova foto 7', type: 'image' },
    { src: 'IMG-20220911-14422429.jpg', caption: 'Nova foto 8', type: 'image' },
    { src: 'IMG-20250317-17048018.jpg', caption: 'Nova foto 9', type: 'image' },
    { src: 'IMG-20250614-16249228.jpg', caption: 'Nova foto 10', type: 'image' }
];
let currentImageIndex = 0;

// Carregar mídias salvas no localStorage
function loadSavedMedia() {
    const savedMedia = JSON.parse(localStorage.getItem('galleryMedia') || '[]');
    galleryImages = [...galleryImages, ...savedMedia];
    updateGallery();
}

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

// Função para atualizar a galeria
function updateGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = ''; // Limpar galeria
    galleryImages.forEach((media, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        let mediaElement;
        if (media.type === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.src = media.src;
            mediaElement.alt = media.caption;
            mediaElement.className = 'gallery-img';
            mediaElement.loading = 'lazy';
        } else {
            mediaElement = document.createElement('video');
            mediaElement.src = media.src;
            mediaElement.className = 'gallery-video';
            mediaElement.poster = 'thumbnail.jpg'; // Substitua por um thumbnail real se disponível
            mediaElement.controls = true;
        }
        mediaElement.onclick = () => openLightbox(media.src, index, media.type);
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = media.caption;
        galleryItem.appendChild(mediaElement);
        galleryItem.appendChild(caption);
        galleryGrid.appendChild(galleryItem);
    });
}

// Função para lidar com upload de arquivos
uploadBtn.addEventListener('click', () => {
    const files = mediaUpload.files;
    if (!files.length) {
        uploadStatus.textContent = 'Por favor, selecione pelo menos um arquivo.';
        return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    const newMedia = [];

    Array.from(files).forEach(file => {
        if (!validTypes.includes(file.type)) {
            uploadStatus.textContent = `Arquivo ${file.name} não é um formato válido (JPG, PNG ou MP4).`;
            return;
        }
        if (file.size > maxSize) {
            uploadStatus.textContent = `Arquivo ${file.name} excede o limite de 10MB.`;
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const mediaType = file.type.startsWith('image') ? 'image' : 'video';
            const caption = `Enviado: ${file.name}`;
            newMedia.push({ src: e.target.result, caption, type: mediaType });
            if (newMedia.length === files.length) {
                galleryImages = [...galleryImages, ...newMedia];
                localStorage.setItem('galleryMedia', JSON.stringify(newMedia));
                updateGallery();
                uploadStatus.textContent = 'Arquivos enviados com sucesso!';
                mediaUpload.value = ''; // Limpar input
            }
        };
        reader.readAsDataURL(file);
    });
});

// Controle da galeria de fotos e vídeos (lightbox)
function openLightbox(src, index, type = 'image') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCaption = document.getElementById('lightbox-caption');
    currentImageIndex = index;

    lightbox.classList.add('loading');
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxImg.src = '';
    lightboxVideo.src = '';

    if (type === 'image') {
        lightboxImg.src = src;
        lightboxImg.onload = () => {
            lightbox.classList.remove('loading');
            lightboxImg.style.display = 'block';
        };
    } else {
        lightboxVideo.src = src;
        lightboxVideo.onloadeddata = () => {
            lightbox.classList.remove('loading');
            lightboxVideo.style.display = 'block';
        };
    }

    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
    lightbox.style.display = 'flex';
    stopCarousel();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    lightboxVideo.pause(); // Pausar vídeo ao fechar
    lightbox.style.display = 'none';
}

function changeLightboxImage(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    const media = galleryImages[currentImageIndex];
    openLightbox(media.src, currentImageIndex, media.type);
}

// Fechar lightbox ao clicar fora do conteúdo
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
            const media = galleryImages[nextIndex];
            openLightbox(media.src, nextIndex, media.type);
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
    const eventDate = new Date('2025-06-14T18:00:00-03:00'); // Ajustado para fuso -03
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

// Carregar a primeira música e mídias salvas
loadTrack(0);
loadSavedMedia();
updateGallery();