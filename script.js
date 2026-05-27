// Section Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Calculator Functions
function switchCalculator(calcId) {
    document.querySelectorAll('.calculator-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.calc-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(calcId).classList.add('active');
    event.target.classList.add('active');
}

function calculateVelocity() {
    const u = parseFloat(document.getElementById('vel-u').value) || 0;
    const a = parseFloat(document.getElementById('vel-a').value) || 0;
    const t = parseFloat(document.getElementById('vel-t').value) || 0;
    const v = u + (a * t);
    document.getElementById('vel-result').innerHTML = `<strong>Final Velocity (v):</strong> ${v.toFixed(2)} m/s`;
}

function calculateForce() {
    const m = parseFloat(document.getElementById('force-m').value) || 0;
    const a = parseFloat(document.getElementById('force-a').value) || 0;
    const f = m * a;
    document.getElementById('force-result').innerHTML = `<strong>Force (F):</strong> ${f.toFixed(2)} N`;
}

function calculateWork() {
    const f = parseFloat(document.getElementById('work-f').value) || 0;
    const d = parseFloat(document.getElementById('work-d').value) || 0;
    const w = f * d;
    document.getElementById('work-result').innerHTML = `<strong>Work (W):</strong> ${w.toFixed(2)} J`;
}

function calculateKineticEnergy() {
    const m = parseFloat(document.getElementById('ke-m').value) || 0;
    const v = parseFloat(document.getElementById('ke-v').value) || 0;
    const ke = 0.5 * m * (v * v);
    document.getElementById('ke-result').innerHTML = `<strong>Kinetic Energy (KE):</strong> ${ke.toFixed(2)} J`;
}

function calculateWeight() {
    const m = parseFloat(document.getElementById('grav-m').value) || 0;
    const g = parseFloat(document.getElementById('grav-g').value) || 9.8;
    const w = m * g;
    document.getElementById('grav-result').innerHTML = `<strong>Weight (W):</strong> ${w.toFixed(2)} N`;
}

function calculateHeat() {
    const m = parseFloat(document.getElementById('heat-m').value) || 0;
    const c = parseFloat(document.getElementById('heat-c').value) || 0;
    const t = parseFloat(document.getElementById('heat-t').value) || 0;
    const q = m * c * t;
    document.getElementById('heat-result').innerHTML = `<strong>Heat Energy (Q):</strong> ${q.toFixed(2)} J`;
}

// Simulator Functions
function switchSimulator(simId) {
    document.querySelectorAll('.simulator-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sim-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(simId).classList.add('active');
    event.target.classList.add('active');
}

let projectileAnimationId;

function updateProjectile() {
    const angle = parseFloat(document.getElementById('proj-angle').value);
    const velocity = parseFloat(document.getElementById('proj-velocity').value);
    document.getElementById('angle-display').textContent = angle + '°';
    document.getElementById('velocity-display').textContent = velocity + ' m/s';
    drawProjectile(angle, velocity);
}

function drawProjectile(angle, initialVelocity) {
    const canvas = document.getElementById('projectile-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const g = 9.8;
    const angleRad = (angle * Math.PI) / 180;
    const vx = initialVelocity * Math.cos(angleRad);
    const vy = initialVelocity * Math.sin(angleRad);

    const scale = canvas.width / 50;
    const timeOfFlight = (2 * vy) / g;
    const maxRange = (initialVelocity * initialVelocity * Math.sin(2 * angleRad)) / g;
    const maxHeight = (vy * vy) / (2 * g);

    // Draw ground
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();

    // Draw trajectory
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= maxRange; i += 0.5) {
        const t = i / vx;
        const y = vy * t - 0.5 * g * t * t;
        const x = i * scale;
        const canvasY = canvas.height - 50 - y * scale;
        if (i === 0) ctx.moveTo(x, canvasY);
        else ctx.lineTo(x, canvasY);
    }
    ctx.stroke();

    // Draw launch point
    ctx.fillStyle = '#f44336';
    ctx.beginPath();
    ctx.arc(0, canvas.height - 50, 5, 0, Math.PI * 2);
    ctx.fill();

    // Display stats
    const stats = `<strong>Range:</strong> ${maxRange.toFixed(2)} m | <strong>Max Height:</strong> ${maxHeight.toFixed(2)} m | <strong>Time of Flight:</strong> ${timeOfFlight.toFixed(2)} s`;
    document.getElementById('projectile-stats').innerHTML = stats;
}

let pendulumAnimationId;
let pendulumAngle = 30;
let pendulumVelocity = 0;
let pendulumRunning = false;

function updatePendulum() {
    pendulumAngle = parseFloat(document.getElementById('pend-angle').value);
    document.getElementById('pend-angle-display').textContent = pendulumAngle + '°';
    drawPendulum(pendulumAngle);
}

function drawPendulum(angle) {
    const canvas = document.getElementById('pendulum-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = 50;
    const length = 150;

    const angleRad = (angle * Math.PI) / 180;
    const bobX = centerX + length * Math.sin(angleRad);
    const bobY = centerY + length * Math.cos(angleRad);

    // Draw pivot
    ctx.fillStyle = '#333';
    ctx.fillRect(centerX - 5, centerY - 5, 10, 10);

    // Draw string
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Draw bob
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function startPendulum() {
    pendulumRunning = true;
    const amplitude = parseFloat(document.getElementById('pend-angle').value);
    let time = 0;

    function animatePendulum() {
        time += 0.05;
        pendulumAngle = amplitude * Math.cos(time * 1.5);
        drawPendulum(pendulumAngle);
        if (pendulumRunning) pendulumAnimationId = requestAnimationFrame(animatePendulum);
    }
    animatePendulum();
}

function stopPendulum() {
    pendulumRunning = false;
    cancelAnimationFrame(pendulumAnimationId);
}

let freefall;

function updateFreeFall() {
    const height = parseFloat(document.getElementById('ff-height').value);
    document.getElementById('ff-height-display').textContent = height + ' m';
    drawFreeFall(height, 0);
}

function drawFreeFall(height, fallDistance) {
    const canvas = document.getElementById('freefall-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = canvas.height / (height + 50);

    // Draw ground
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // Draw height indicator
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(20, canvas.height - 20 - height * scale);
    ctx.lineTo(50, canvas.height - 20 - height * scale);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw falling object
    const objY = canvas.height - 20 - (height - fallDistance) * scale;
    ctx.fillStyle = '#f44336';
    ctx.fillRect(canvas.width / 2 - 10, objY, 20, 20);

    // Draw height text
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText(height.toFixed(1) + ' m', 55, canvas.height - 20 - height * scale);
}

function startFreeFall() {
    const height = parseFloat(document.getElementById('ff-height').value) || 100;
    const g = 9.8;
    let time = 0;
    let falling = true;
    const totalTime = Math.sqrt((2 * height) / g);

    function animate() {
        time += 0.02;
        const fallDistance = 0.5 * g * time * time;

        if (fallDistance >= height) {
            drawFreeFall(height, height);
            const velocity = (g * totalTime).toFixed(2);
            document.getElementById('freefall-stats').innerHTML = `<strong>Final Velocity:</strong> ${velocity} m/s | <strong>Time:</strong> ${totalTime.toFixed(2)} s`;
            falling = false;
        } else {
            drawFreeFall(height, fallDistance);
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Unit Converter Functions
function convertLength() {
    const value = parseFloat(document.getElementById('length-value').value) || 0;
    const from = document.getElementById('length-from').value;
    const to = document.getElementById('length-to').value;

    const conversions = {
        'm': 1,
        'km': 1000,
        'cm': 0.01,
        'mm': 0.001,
        'ft': 0.3048
    };

    const meters = value * conversions[from];
    const result = meters / conversions[to];
    document.getElementById('length-result').innerHTML = `${value} ${from} = <strong>${result.toFixed(4)} ${to}</strong>`;
}

function convertTemperature() {
    const value = parseFloat(document.getElementById('temp-value').value) || 0;
    const from = document.getElementById('temp-from').value;
    const to = document.getElementById('temp-to').value;

    let celsius;
    if (from === 'C') celsius = value;
    else if (from === 'F') celsius = (value - 32) * 5/9;
    else if (from === 'K') celsius = value - 273.15;

    let result;
    if (to === 'C') result = celsius;
    else if (to === 'F') result = celsius * 9/5 + 32;
    else if (to === 'K') result = celsius + 273.15;

    document.getElementById('temp-result').innerHTML = `${value}° ${from} = <strong>${result.toFixed(2)}° ${to}</strong>`;
}

function convertSpeed() {
    const value = parseFloat(document.getElementById('speed-value').value) || 0;
    const from = document.getElementById('speed-from').value;
    const to = document.getElementById('speed-to').value;

    const conversions = {
        'ms': 1,
        'kmh': 3.6,
        'mph': 2.237,
        'knots': 1.944
    };

    const ms = value / conversions[from];
    const result = ms * conversions[to];
    document.getElementById('speed-result').innerHTML = `${value} ${from} = <strong>${result.toFixed(4)} ${to}</strong>`;
}

function convertMass() {
    const value = parseFloat(document.getElementById('mass-value').value) || 0;
    const from = document.getElementById('mass-from').value;
    const to = document.getElementById('mass-to').value;

    const conversions = {
        'kg': 1,
        'g': 0.001,
        'lb': 0.453592,
        'ton': 1000
    };

    const kg = value * conversions[from];
    const result = kg / conversions[to];
    document.getElementById('mass-result').innerHTML = `${value} ${from} = <strong>${result.toFixed(4)} ${to}</strong>`;
}

function convertEnergy() {
    const value = parseFloat(document.getElementById('energy-value').value) || 0;
    const from = document.getElementById('energy-from').value;
    const to = document.getElementById('energy-to').value;

    const conversions = {
        'J': 1,
        'kJ': 1000,
        'cal': 4.184,
        'kcal': 4184
    };

    const joules = value * conversions[from];
    const result = joules / conversions[to];
    document.getElementById('energy-result').innerHTML = `${value} ${from} = <strong>${result.toFixed(4)} ${to}</strong>`;
}

// Quiz Functions
const quizQuestions = [
    {
        question: 'What is the SI unit of force?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correct: 1
    },
    {
        question: 'What does F = ma represent?',
        options: ['Work formula', "Newton's Second Law", 'Energy formula', 'Power formula'],
        correct: 1
    },
    {
        question: 'What is the acceleration due to gravity on Earth?',
        options: ['5 m/s²', '9.8 m/s²', '15 m/s²', '20 m/s²'],
        correct: 1
    },
    {
        question: 'What is the speed of light?',
        options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁷ m/s', '3 × 10⁹ m/s'],
        correct: 0
    },
    {
        question: 'What is the formula for kinetic energy?',
        options: ['KE = mgh', 'KE = ½mv²', 'KE = Fd', 'KE = F/m'],
        correct: 1
    },
    {
        question: 'What is the SI unit of energy?',
        options: ['Newton', 'Watt', 'Joule', 'Pascal'],
        correct: 2
    },
    {
        question: 'What is Ohm\'s Law?',
        options: ['V = IR', 'V = I/R', 'V = I + R', 'V = IR²'],
        correct: 0
    },
    {
        question: 'What is the wavelength of visible light?',
        options: ['100-500 nm', '400-700 nm', '800-1000 nm', '200-300 nm'],
        correct: 1
    },
    {
        question: 'What is the formula for density?',
        options: ['D = m/V', 'D = V/m', 'D = m + V', 'D = m × V'],
        correct: 0
    },
    {
        question: 'What is the SI unit of temperature?',
        options: ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine'],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizStarted = false;

function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('question-display').innerHTML = `<strong>Question ${currentQuestion + 1}:</strong> ${question.question}`;

    let optionsHTML = '';
    question.options.forEach((option, index) => {
        optionsHTML += `<div class="option" onclick="selectOption(${index})">${option}</div>`;
    });
    document.getElementById('options-display').innerHTML = optionsHTML;
    selectedAnswer = null;
}

function selectOption(index) {
    selectedAnswer = index;
    document.querySelectorAll('.option').forEach((el, i) => {
        el.classList.remove('selected');
        if (i === index) el.classList.add('selected');
    });
}

function nextQuestion() {
    if (selectedAnswer === null) {
        alert('Please select an answer!');
        return;
    }

    const question = quizQuestions[currentQuestion];
    if (selectedAnswer === question.correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    const percentage = (score / quizQuestions.length * 100).toFixed(1);
    document.getElementById('score-display').innerHTML = `You scored <strong>${score}/${quizQuestions.length}</strong> (${percentage}%)`;
}

function restartQuiz() {
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
    startQuiz();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    drawProjectile(45, 25);
    updatePendulum();
    updateFreeFall();
});