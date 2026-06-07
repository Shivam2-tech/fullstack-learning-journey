let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function updateDisplay() {
  const currentTime = elapsedTime + (isRunning ? Date.now() - startTime : 0);
  display.textContent = formatTime(currentTime);
}

function start() {
  if (!isRunning) {
    startTime = Date.now();
    isRunning = true;
    timerInterval = setInterval(updateDisplay, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

function stop() {
  if (isRunning) {
    elapsedTime += Date.now() - startTime;
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00.00';
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

// Initialize display
display.textContent = '00:00.00';
stopBtn.disabled = true;
