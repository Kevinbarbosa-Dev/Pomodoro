/*

document.addEventListener('DOMContentLoaded', function () {
    let readButton = document.getElementById('angles');
    let card = document.getElementById('task-resumeid');

    readButton.addEventListener('click', function () {
        card.classList.toggle('auto-height');
        readButton.classList.toggle('fa-angles-up');
        readButton.classList.toggle('fa-angles-down');
    });
});
*/

// se clicar no botão down a altura do card fica em auto

document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.getElementById('barra');
    let overlay = document.getElementById('overlay');
    let close = document.getElementById('close');

    menuBtn.addEventListener('click', function () {
        if (window.innerWidth <= 600) {
            overlay.style.width = '90%';
        } else if (window.innerWidth <= 700) {
            overlay.style.width = '70%';
        } else if (window.innerWidth <= 980) {
            overlay.style.width = '50%';
        } else {
            overlay.style.width = '30%';
        }
    });

    close.addEventListener('click', function () {
        overlay.style.width = '0%';
    });

});

// se input for apagado ou acrecentado e se textarea estiver on então textare continua on
let inputText = document.getElementById('todo');

function inputAtive() {
    let adicionar = document.getElementById('addOk')
    adicionar.style.display = inputText.value.trim() !== "" ? "block" : "none";
}
function nota() {
    let resume = document.getElementById('resumeId');
    // textarea
    let closeNote = document.getElementById('fecharNote');
    // botão fechar textarea
    let notebtn = document.getElementById('note');
    // botão note
    let taskContainer = document.getElementById('task-container');
    // container do overlay
    notebtn.style.display = 'none'
    resume.style.display = 'block'
    closeNote.style.display = 'block';
    taskContainer.style.height = '330px';
    resume.focus();

    closeNote.addEventListener('click', function () {
        resume.style.display = 'none';
        closeNote.style.display = 'none';
        resume.value = "";
        notebtn.style.display = 'block';
        taskContainer.style.height = '440px';
    });
}

document.getElementById('todo').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        task();
    }
});

function task() {
    let taskText = inputText.value.trim();
    let resumeContent = document.getElementById('resumeId').value.trim();
    let taskList = document.getElementById('tasks');
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    let checkbox = document.createElement('i');
    checkbox.className = 'checkbox';
    let newTaskContainer = document.createElement('div');
    let newTask = document.createElement('li');
    newTask.className = 'taskEdit';
    let taskResume = document.createElement('div');
    taskResume.className = 'task-resume';
    let span = document.createElement('p');
    span.classList.add("text-resume");
    span.textContent = resumeContent;
    let angle = document.createElement('button')
    angle.innerHTML = '<i class="fa-solid fa-angles-down"></i>';
    angle.classList.add("angle");

    

    // Checkbox
    checkbox.innerHTML = '<i class="fa-regular fa-square"></i>';
    checkbox.onclick = function () {
        checkbox.innerHTML = '<i class="fa-solid fa-square-check"></i>'
    };

    newTask.innerHTML = `<span>${taskText}</span>`;
    newTaskContainer.appendChild(newTask);

    let remove = document.createElement('button');
    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';

    remove.addEventListener('click', function () {
        removeTask(taskDiv);
    });
    angle.onclick = function () {
        if (span.classList.contains("expanded")) {
            span.classList.remove("expanded");
            span.style.maxHeight = "135px"; // Recolhe o texto
            angle.innerHTML = '<i class="fa-solid fa-angles-down"></i>'; // Altera o ícone para baixo
        } else {
            span.classList.add("expanded");
            span.style.maxHeight = span.scrollHeight + "px"; // Expande o texto
            angle.innerHTML = '<i class="fa-solid fa-angles-up"></i>'; // Altera o ícone para cima
        }
    }
    
    if (resumeContent !== "") {
        taskResume.appendChild(span);
        newTaskContainer.appendChild(taskResume);
        taskDiv.classList.toggle('divResumeStart');
        remove.classList.toggle('trash-resume');
    } else {
        taskDiv.classList.toggle('divResume');
        remove.classList.toggle('trash');
    }

    if (resumeContent.length > 135) {
        taskResume.appendChild(angle);
        angle.style.display = 'block';
    }


    


    newTaskContainer.style.alignItems = "center";

    // Adicionando classes aos elementos
    newTaskContainer.classList.add('containerTaskNew');

    // Adicionando elementos ao taskDiv
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(newTaskContainer);
    taskDiv.appendChild(remove);
    taskList.appendChild(taskDiv);

    // Limpar campos
    inputText.value = '';
    document.getElementById('resumeId').value = '';
    inputText.focus();
    inputAtive();
}
function removeTask(taskDiv) {
    taskDiv.remove();
}


let timerInterval;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let icon = document.getElementById('icon');
document.body.classList.add("pomodoro-bg")

function pomodoro() {
    minutes = 25;
    seconds = 0;
    enableButtons();
    document.body.classList.remove("descansar-bg");
    document.body.classList.add("pomodoro-bg")
    const paragraph = document.getElementById('tempo');
    paragraph.style.color = "#260F26"
    updateTimerDisplay();
}

function descansar() {
    minutes = 15;
    seconds = 0;
    enableButtons();
    document.body.classList.remove("pomodoro-bg");
    document.body.classList.add("descansar-bg");
    const paragraph = document.getElementById('tempo');
    paragraph.style.color = "#CD7B5C"
    updateTimerDisplay();
}

function updateTimer() {
    if (seconds > 0 || minutes > 0) {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
    updateTimerDisplay();
}

function add() {
    if (!isRunning && minutes < 120) {
        minutes += 15;
        seconds = 0;
        updateTimerDisplay();
    }
}

function minus() {
    if (!isRunning && minutes > 0) {
        minutes -= 15;
        seconds = 0;

        if (minutes < 0) {
            minutes = 0;
        }
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('tempo');
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    document.title = `${formatTime(minutes)}:${formatTime(seconds)} - Pomodoro Timer`;

}

function começar() {
    if (isRunning) {
        clearInterval(timerInterval);
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        enableButtons();
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        disableButtons();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    isRunning = !isRunning;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function enableButtons() {
    document.getElementById('addButton').disabled = false;
    document.getElementById('minusButton').disabled = false;
}

function disableButtons() {
    document.getElementById('addButton').disabled = true;
    document.getElementById('minusButton').disabled = true;
}

