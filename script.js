let timerInterval;
let minutes = 0;
let seconds = 0;
document.body.classList.add("pomodoro-bg")

// se posivel colocar sons de chuva,fogueira ou game 8-bit

function pomodoro() {
    minutes = 30;
    seconds = 0;
    document.getElementById('addButton').disabled = false
    document.getElementById('minusButton').disabled = false
    document.body.classList.remove("descansar-bg");
    document.body.classList.add("pomodoro-bg")
    const paragraph = document.getElementById('tempo');
    paragraph.style.color = "#260F26"
    updateTimerDisplay();
}



function descansar() {
    minutes = 15;
    seconds = 0;
    document.getElementById('addButton').disabled = false
    document.getElementById('minusButton').disabled = false
    document.body.classList.remove("pomodoro-bg");
    document.body.classList.add("descansar-bg");
    const paragraph = document.getElementById('tempo');
    paragraph.style.color = "#CD7B5C"
    updateTimerDisplay();
}



function updateTimer() {
    seconds--;
    if (seconds < 0) {
        if (minutes > 0) {
            seconds = 59;
            minutes--;

        } if (seconds < 0) {
            seconds = 0
            document.getElementById('play').disabled = false
            document.getElementById('addButton').disabled = false
            document.getElementById('minusButton').disabled = false
        }
    }
    if (minutes == 0 && seconds == 0) {
        window.alert('Tempo esgotado')
        clearInterval(timerInterval);
    }
    updateTimerDisplay();
}
/*    let card = document.getElementById('addButton');
    card.classList.toggle("animate__flip"); */
function add() {

    if (minutes < 60) {
        minutes += 15;
        seconds = 0;

    }
    updateTimerDisplay();
}
function minus() {
    if (minutes > 0) {
        minutes -= 15;
        seconds = 0;
    }
    updateTimerDisplay();
}
function pause() {
    clearInterval(timerInterval);
    document.getElementById('play').disabled = false
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('tempo');
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}
// Função para iniciar o timer
function começar() {
    timerInterval = setInterval(updateTimer, 1000);
    document.getElementById('play').disabled = true
    document.getElementById('addButton').disabled = true
    document.getElementById('minusButton').disabled = true



}


