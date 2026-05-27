// Navigation
function navigateTo(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
}

// Topics
const topicsData = {
    mechanics: {
        title: 'Mechanics',
        content: '<h3>Key Concepts</h3><ul><li><strong>F = ma</strong> - Newton\'s Second Law</li><li><strong>v = u + at</strong> - Kinematics</li><li><strong>E = ½mv²</strong> - Kinetic Energy</li><li><strong>W = Fd</strong> - Work</li><li><strong>p = mv</strong> - Momentum</li></ul>'
    },
    waves: {
        title: 'Waves & Sound',
        content: '<h3>Key Concepts</h3><ul><li><strong>v = fλ</strong> - Wave Equation</li><li><strong>I = P/A</strong> - Intensity</li><li><strong>f\' = f(v±vo)/(v±vs)</strong> - Doppler Effect</li><li>Refraction, Diffraction, Interference</li></ul>'
    },
    electricity: {
        title: 'Electricity & Magnetism',
        content: '<h3>Key Concepts</h3><ul><li><strong>V = IR</strong> - Ohm\'s Law</li><li><strong>P = VI</strong> - Power</li><li><strong>E = QV</strong> - Energy</li><li><strong>F = qvB sin θ</strong> - Magnetic Force</li></ul>'
    },
    thermodynamics: {
        title: 'Thermodynamics',
        content: '<h3>Key Concepts</h3><ul><li><strong>Q = mcΔT</strong> - Heat Energy</li><li><strong>ΔU = Q - W</strong> - First Law</li><li><strong>η = W/Q</strong> - Efficiency</li><li>Entropy, State Functions</li></ul>'
    },
    modern: {
        title: 'Modern Physics',
        content: '<h3>Key Concepts</h3><ul><li><strong>E = hf</strong> - Photon Energy</li><li><strong>E = mc²</strong> - Mass-Energy</li><li>Quantum Numbers, Atomic Structure</li><li>Nuclear Reactions, Half-life</li></ul>'
    },
    astrophysics: {
        title: 'Astrophysics',
        content: '<h3>Key Concepts</h3><ul><li><strong>F = Gm₁m₂/r²</strong> - Gravity</li><li>Stellar Evolution, Cosmology</li><li>Kepler\'s Laws</li><li>Black Holes, Expansion of Universe</li></ul>'
    }
};

function openTopic(topic) {
    const data = topicsData[topic];
    document.getElementById('topic-content').innerHTML = `<h2>${data.title}</h2>${data.content}`;
    document.getElementById('topic-detail').style.display = 'block';
    document.querySelector('.topics-grid').style.display = 'none';
}

function closeTopic() {
    document.getElementById('topic-detail').style.display = 'none';
    document.querySelector('.topics-grid').style.display = 'grid';
}

// Flashcards
const flashcards = [
    { q: 'F = ma', a: 'Newton\'s Second Law - Force equals mass times acceleration' },
    { q: 'v = u + at', a: 'Kinematic equation - final velocity' },
    { q: 'E = ½mv²', a: 'Kinetic Energy formula' },
    { q: 'W = Fd', a: 'Work done by a force' },
    { q: 'p = mv', a: 'Momentum - mass times velocity' },
    { q: 'v = fλ', a: 'Wave equation - velocity, frequency, wavelength' },
    { q: 'V = IR', a: 'Ohm\'s Law - voltage, current, resistance' },
    { q: 'P = VI', a: 'Electrical Power' },
    { q: 'Q = mcΔT', a: 'Heat energy formula' },
    { q: 'E = hf', a: 'Photon energy - Planck\'s constant times frequency' },
    { q: 'E = mc²', a: 'Mass-energy equivalence by Einstein' },
    { q: 'F = Gm₁m₂/r²', a: 'Gravitational force' },
    { q: 'I = P/A', a: 'Intensity - power per unit area' },
    { q: 'ΔU = Q - W', a: 'First Law of Thermodynamics' },
    { q: 'η = W/Q', a: 'Efficiency of a heat engine' },
    { q: 'sin θ = nλ/d', a: 'Diffraction grating formula' },
    { q: 'c = 3×10⁸ m/s', a: 'Speed of light in vacuum' },
    { q: 'g = 9.8 m/s²', a: 'Acceleration due to gravity' },
    { q: 'T = 1/f', a: 'Period and frequency relationship' },
    { q: 'a = v²/r', a: 'Centripetal acceleration' }
];

let currentCard = 0;

function nextFlashcard() {
    currentCard = (currentCard + 1) % flashcards.length;
    displayFlashcard();
}

function previousFlashcard() {
    currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
    displayFlashcard();
}

function displayFlashcard() {
    const card = flashcards[currentCard];
    const fc = document.getElementById('flashcard');
    fc.classList.remove('flipped');
    fc.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front"><p>${card.q}</p></div>
            <div class="flashcard-back"><p>${card.a}</p></div>
        </div>
    `;
    document.getElementById('flashcard-counter').textContent = `${currentCard + 1} / ${flashcards.length}`;
    fc.onclick = () => fc.classList.toggle('flipped');
}

// Notes
function saveNotes() {
    const notes = document.getElementById('notes').value;
    if (notes.trim()) {
        const list = document.getElementById('notes-list');
        const item = document.createElement('div');
        item.className = 'note-item';
        item.innerHTML = `<p>${notes}</p><small>${new Date().toLocaleString()}</small>`;
        list.prepend(item);
        document.getElementById('notes').value = '';
    }
}

// Tool Switching
function switchTool(tool) {
    document.querySelectorAll('.tool-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tool).classList.add('active');
    event.target.classList.add('active');
}

function switchCalc(calc) {
    document.querySelectorAll('.calc-item').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(calc).classList.add('active');
    event.target.classList.add('active');
}

function switchSim(sim) {
    document.querySelectorAll('.sim-item').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sim-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(sim).classList.add('active');
    event.target.classList.add('active');
}

// Calculators
function calcVelocity() {
    const u = parseFloat(document.getElementById('vel-u').value) || 0;
    const a = parseFloat(document.getElementById('vel-a').value) || 0;
    const t = parseFloat(document.getElementById('vel-t').value) || 0;
    const v = u + (a * t);
    document.getElementById('vel-result').innerHTML = `<strong>v = ${v.toFixed(2)} m/s</strong>`;
}

function calcForce() {
    const m = parseFloat(document.getElementById('force-m').value) || 0;
    const a = parseFloat(document.getElementById('force-a').value) || 0;
    const f = m * a;
    document.getElementById('force-result').innerHTML = `<strong>F = ${f.toFixed(2)} N</strong>`;
}

function calcWork() {
    const f = parseFloat(document.getElementById('work-f').value) || 0;
    const d = parseFloat(document.getElementById('work-d').value) || 0;
    const w = f * d;
    document.getElementById('work-result').innerHTML = `<strong>W = ${w.toFixed(2)} J</strong>`;
}

function calcKE() {
    const m = parseFloat(document.getElementById('ke-m').value) || 0;
    const v = parseFloat(document.getElementById('ke-v').value) || 0;
    const ke = 0.5 * m * (v * v);
    document.getElementById('ke-result').innerHTML = `<strong>KE = ${ke.toFixed(2)} J</strong>`;
}

// Unit Converters
function convertLength() {
    const val = parseFloat(document.getElementById('length-val').value) || 0;
    const from = document.getElementById('length-from').value;
    const to = document.getElementById('length-to').value;
    const conversions = { m: 1, km: 1000, cm: 0.01, mm: 0.001 };
    const result = (val * conversions[from]) / conversions[to];
    document.getElementById('length-result').innerHTML = `${val} ${from} = <strong>${result.toFixed(4)} ${to}</strong>`;
}

function convertTemp() {
    const val = parseFloat(document.getElementById('temp-val').value) || 0;
    const from = document.getElementById('temp-from').value;
    const to = document.getElementById('temp-to').value;
    let celsius;
    if (from === '°C') celsius = val;
    else if (from === '°F') celsius = (val - 32) * 5/9;
    else celsius = val - 273.15;
    let result;
    if (to === '°C') result = celsius;
    else if (to === '°F') result = celsius * 9/5 + 32;
    else result = celsius + 273.15;
    document.getElementById('temp-result').innerHTML = `${val}${from} = <strong>${result.toFixed(2)}${to}</strong>`;
}

function convertSpeed() {
    const val = parseFloat(document.getElementById('speed-val').value) || 0;
    const from = document.getElementById('speed-from').value;
    const to = document.getElementById('speed-to').value;
    const conversions = { 'm/s': 1, 'km/h': 3.6, 'mph': 2.237 };
    const result = (val / conversions[from]) * conversions[to];
    document.getElementById('speed-result').innerHTML = `${val} ${from} = <strong>${result.toFixed(4)} ${to}</strong>`;
}

// Simulations
function updateProjectile() {
    const angle = parseFloat(document.getElementById('proj-angle').value);
    const vel = parseFloat(document.getElementById('proj-vel').value);
    document.getElementById('angle-val').textContent = angle + '°';
    document.getElementById('vel-val').textContent = vel + ' m/s';
    drawProjectile(angle, vel);
}

function drawProjectile(angle, v) {
    const canvas = document.getElementById('projectile-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const angleRad = angle * Math.PI / 180;
    const g = 9.8;
    const vx = v * Math.cos(angleRad);
    const vy = v * Math.sin(angleRad);
    const maxRange = (v * v * Math.sin(2 * angleRad)) / g;
    const maxHeight = (vy * vy) / (2 * g);
    
    const scale = canvas.width / (maxRange * 1.2);
    
    // Draw ground
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();
    
    // Draw trajectory
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= maxRange; x += 0.1) {
        const t = x / vx;
        const y = vy * t - 0.5 * g * t * t;
        const px = x * scale;
        const py = canvas.height - 50 - y * scale;
        if (x === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
}

function updatePendulum() {
    const angle = parseFloat(document.getElementById('pend-angle').value);
    document.getElementById('pend-angle-val').textContent = angle + '°';
    drawPendulum(angle);
}

function drawPendulum(angle) {
    const canvas = document.getElementById('pendulum-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = 50;
    const length = 150;
    const angleRad = angle * Math.PI / 180;
    const x = cx + length * Math.sin(angleRad);
    const y = cy + length * Math.cos(angleRad);
    
    ctx.fillStyle = '#333';
    ctx.fillRect(cx - 5, cy - 5, 10, 10);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
}

let pendulumRunning = false;

function startPendulum() {
    pendulumRunning = true;
    const maxAngle = parseFloat(document.getElementById('pend-angle').value);
    let time = 0;
    const animate = () => {
        time += 0.05;
        const angle = maxAngle * Math.cos(time * 1.5);
        drawPendulum(angle);
        if (pendulumRunning) requestAnimationFrame(animate);
    };
    animate();
}

function stopPendulum() {
    pendulumRunning = false;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFlashcard();
    updateProjectile();
    updatePendulum();
});
