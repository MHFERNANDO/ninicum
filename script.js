// ===== CONFIG =====
const BIRTHDAY = 'April 7, 2026 00:00:00';
const INTRO_DURATION = 6500;

// ===== PETALS =====
function startPetals() {
    const canvas = document.getElementById('petal-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f5c6c6', '#e8a0a0', '#fce8e8', '#c9956b', '#fdf0e8'];
    const petals = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 1.5 + 0.8,
        drift: Math.random() * 1.5 - 0.75,
        spin: Math.random() * 0.04 - 0.02,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.55 + 0.25,
    }));

    let running = true;
    function draw() {
        if (!running) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => {
            p.y += p.speed;
            p.x += p.drift;
            p.angle += p.spin;
            if (p.y > canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(draw);
    }
    draw();
    setTimeout(() => { running = false; }, INTRO_DURATION);
}

// ===== INTRO TRANSITION =====
window.addEventListener('load', () => {
    startPetals();
    const intro = document.getElementById('intro-overlay');
    const main  = document.getElementById('main-content');

    setTimeout(() => {
        intro.classList.add('fade-out');
        main.classList.add('visible');
        setTimeout(() => {
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.65 },
                colors: ['#f5c6c6', '#e8a0a0', '#c9956b', '#fdf0e8'] });
        }, 600);
    }, INTRO_DURATION);
});

// ===== COUNTDOWN =====
function updateCountdown() {
    const gap = new Date(BIRTHDAY) - new Date();
    if (gap <= 0) {
        document.getElementById('countdown').innerHTML =
            '<div class="birthday-msg">¡Feliz Cumpleaños Nicole! 🎉</div>';
        return;
    }
    const d = Math.floor(gap / 86400000);
    const h = Math.floor((gap % 86400000) / 3600000);
    const m = Math.floor((gap % 3600000) / 60000);
    const s = Math.floor((gap % 60000) / 1000);
    const block = (n, l) =>
        `<div class="count-block"><span class="count-number">${String(n).padStart(2,'0')}</span><span class="count-label">${l}</span></div>`;
    document.getElementById('countdown').innerHTML =
        block(d,'días') + block(h,'horas') + block(m,'min') + block(s,'seg');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== MODAL =====
const MODAL_DATA = {
    recuerdo: {
        emoji: '📸',
        title: '¡Mira quién es!',
        text: '¡Siempre unas ratas tan locas! Te Amo, Nicole. ❤️',
        img: 'nicocum.jpg',
    },
    vale: {
        emoji: '🎟️',
        title: 'Vale por...',
        text: '¡Este ticket es válido por un piscinasooooo muy especial donde experimentemos competencias olímpicas — ¡chendo jsjs!',
    },
    musica: {
        emoji: '🎵',
        title: 'Para tus oídos',
        text: 'Pienso en ti en cada acorde 🎶',
        music: true,
    },
};

function openModal(type) {
    const data = MODAL_DATA[type];
    if (!data) return;

    document.getElementById('modal-emoji').textContent = data.emoji;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-text').textContent  = data.text;

    const img = document.getElementById('modal-img');
    img.style.display = 'none';
    if (data.img) {
        img.src = data.img;
        img.style.display = 'block';
    }

    const btn = document.getElementById('music-btn');
    btn.style.display = data.music ? 'inline-flex' : 'none';

    const overlay = document.getElementById('modal');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modal');
    const box = overlay.querySelector('.modal-box');
    box.style.transform = 'scale(0.85) translateY(20px)';
    box.style.opacity = '0';
    setTimeout(() => {
        overlay.classList.remove('open');
        box.style.transform = '';
        box.style.opacity = '';
        document.body.style.overflow = '';
    }, 350);
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('modal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


// ===== CARTA ANIMADA =====
const LETTER_TEXT =
`Durante todos estos momentos hemos experimentado un sin numero de momentos juntos, pero sin duda alguna, quiero expresarte en este tu no cumpleaños algo especial..

Gracias por cada risa, cada momento de locura compartida y por ser exactamente esa rata que me mueve el mundo entero, eres tu mujer.

Todavia no es el cumple mi amor, pero vamos comenzando reciencitoooooo.

¡Feliz cumpleaños, Nicole! 🎂🌸`;

let envelopeOpened = false;

function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    const envelope = document.getElementById('envelope');
    const paper    = document.getElementById('letter-paper');
    const body     = document.getElementById('letter-body');

    envelope.classList.add('opened');

    setTimeout(() => {
        paper.style.display = 'block';
        typewriterEffect(body, LETTER_TEXT, 28);
    }, 700);
}

function typewriterEffect(el, text, speed) {
    let i = 0;
    el.textContent = '';
    const timer = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            el.classList.add('done');
        }
    }, speed);
}


// ===== SCRATCH CARD =====
(function initScratch() {
    const canvas  = document.getElementById('scratch-canvas');
    const hint    = document.getElementById('scratch-hint');
    const wrapper = canvas.parentElement;

    // Size canvas to match wrapper after layout
    function sizeCanvas() {
        const rect = wrapper.getBoundingClientRect();
        canvas.width  = rect.width;
        canvas.height = rect.height;
        drawScratchLayer();
    }

    function drawScratchLayer() {
        const ctx = canvas.getContext('2d');
        // Silver-pink scratch layer
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0,   '#f5c6c6');
        grad.addColorStop(0.4, '#e8a0a0');
        grad.addColorStop(1,   '#c9956b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decorative text on the layer
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.font = 'bold 18px Cormorant Garamond, serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎁  Rasca aquí  🎁', canvas.width / 2, canvas.height / 2);
    }

    let painting = false;
    let totalPixels = 0;
    let revealedPixels = 0;
    let revealed = false;

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const src  = e.touches ? e.touches[0] : e;
        return {
            x: (src.clientX - rect.left) * (canvas.width  / rect.width),
            y: (src.clientY - rect.top)  * (canvas.height / rect.height),
        };
    }

    function scratch(e) {
        if (!painting || revealed) return;
        e.preventDefault();
        const ctx = canvas.getContext('2d');
        const pos = getPos(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
        ctx.fill();
        checkReveal(ctx);
    }

    function checkReveal(ctx) {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparent = 0;
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] < 128) transparent++;
        }
        const pct = transparent / (canvas.width * canvas.height);
        if (pct > 0.55 && !revealed) {
            revealed = true;
            canvas.style.transition = 'opacity 0.8s ease';
            canvas.style.opacity = '0';
            hint.style.opacity = '0';
            setTimeout(() => { canvas.style.display = 'none'; }, 800);
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 },
                colors: ['#f5c6c6', '#e8a0a0', '#c9956b'] });
        }
    }

    canvas.addEventListener('mousedown',  e => { painting = true;  scratch(e); });
    canvas.addEventListener('mousemove',  e => scratch(e));
    canvas.addEventListener('mouseup',    () => painting = false);
    canvas.addEventListener('mouseleave', () => painting = false);
    canvas.addEventListener('touchstart', e => { painting = true;  scratch(e); }, { passive: false });
    canvas.addEventListener('touchmove',  e => scratch(e), { passive: false });
    canvas.addEventListener('touchend',   () => painting = false);

    // Init after fonts/layout settle
    window.addEventListener('load', () => setTimeout(sizeCanvas, 400));
    window.addEventListener('resize', sizeCanvas);
})();