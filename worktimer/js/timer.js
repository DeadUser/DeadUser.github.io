let startTime = 0;
let pausedTime = 0;
let intervalId;
let history = [];

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
//const stopBtn = document.getElementById('stop-btn');
const actionHistory = document.getElementById('action-history');

timerDisplay.textContent = '00:00:00';

function startTimer() {
    startTime = Date.now() - pausedTime;
    intervalId = setInterval(updateTimerDisplay, 10);

    startBtn.innerHTML = "Start";
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    //stopBtn.disabled = false;

    history.push({ type: !pausedTime ? 'start' : 'resume', time: new Date().toLocaleTimeString(), });
    displayHistory();
}

function pauseTimer() {
    clearInterval(intervalId);
    pausedTime = Date.now() - startTime;

    startBtn.innerHTML = "Resume";
    startBtn.disabled = false;
    pauseBtn.disabled = true;

    history.push({ type: 'pause', time: new Date().toLocaleTimeString(), });
    displayHistory();
}

function stopTimer() {
    clearInterval(intervalId);
    pausedTime = 0;
    startTime = 0;
    timerDisplay.textContent = '00:00:00';

    startBtn.innerHTML = "Start";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    //stopBtn.disabled = true;

    history.push({ type: 'stop', time: new Date().toLocaleTimeString(), });
    displayHistory();
}

function updateTimerDisplay() {
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    document.title = `${hours}:${minutes}:${seconds}`;
}

function displayHistory() {
    var historyHtml = '';
    history.forEach(function (action) {
        historyHtml += `<tr><td class="text-right w-50">${action.type}</td><td class="text-left">${action.time}</td></tr>`;
    });
    document.getElementById('action-history').innerHTML = historyHtml;
}

displayHistory();
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
//stopBtn.addEventListener('click', stopTimer);