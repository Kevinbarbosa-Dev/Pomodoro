let overlay = document.getElementById('overlay');

document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.getElementById('barra');

    let close = document.getElementById('close');

    // se tela estiver em 600px, quando clicar em openModal o overlay fecha
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
    });;

    close.addEventListener('click', function () {
        overlay.style.width = '0%';
    });

});

// criar bptão que abre opções, quando uma opção for selecionada ela é atribuida na task 
let inputText = document.getElementById('todo');

function inputAtive() {
    let adicionar = document.getElementById('addOk');
    adicionar.style.display = inputText.value.trim() !== "" ? "block" : "none";
}

function nota() {
    let modal = document.getElementById('modal');
    let closeModal = document.getElementById('fecharModal');
    let modalTodo = document.getElementById('modalTodo')
    let modalText = document.getElementById('notasText');
    let adicionar = document.getElementById('addOk');
    let addModal = document.getElementById('addModal');
    if (window.innerWidth <= 980) {
        overlay.style.width = "0%";
        modal.style.display = "flex";
    } else {
        modal.style.display = "flex";
    }
    inputText.value = "";
    adicionar.style.display = "none";
    addModal.addEventListener('click', function () {
        task();
        modalTodo.value = "";
    })

    document.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    if (window.innerWidth <= 600) {
        overlay.style.width = '0%';
    }

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        inputText.value = "";
        modalText.value = "";
        modalTodo.value = "";


    });
}


document.getElementById('todo').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        task();
    }
});



function task() {
    let modalTodo = document.getElementById('modalTodo').value;
    let taskText = inputText.value.trim();
    let resumeContent = document.getElementById('notasText').value.trim();

    // Verificar se há texto na tarefa ou na entrada de notas
    if (taskText !== "" || resumeContent !== "") {
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
        let angle = document.createElement('button');
        angle.innerHTML = '<i class="fa-solid fa-angles-down"></i>';
        angle.classList.add("angle");

        // Checkbox
        checkbox.innerHTML = '<i class="fa-regular fa-square"></i>';
        checkbox.onclick = function () {
            checkbox.innerHTML = '<i class="fa-solid fa-square-check"></i>';
            checkbox.style.padding = '0';
        };

        newTask.innerHTML = `<span>${taskText !== "" ? taskText : modalTodo}</span>`;

        newTaskContainer.appendChild(newTask);

        let remove = document.createElement('button');
        remove.innerHTML = '<i class="fa-solid fa-trash"></i>';

        remove.onclick = function () {
            removeTask(taskDiv);
        };
        let remoEdit = document.createElement("div");
        remoEdit.className = "remoEdit";

        let edit = document.createElement("button");
        edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
        edit.classList.toggle("edit");

        angle.onclick = function () {
            span.classList.toggle("expanded");
            span.style.maxHeight = span.classList.contains("expanded") ? span.scrollHeight + "px" : "135px";
            angle.innerHTML = `<i class="fa-solid fa-angles-${span.classList.contains("expanded") ? "up" : "down"}"></i>`;
        };

        if (resumeContent !== "") {
            taskResume.appendChild(span);
            newTaskContainer.appendChild(taskResume);
            taskDiv.classList.toggle('divResumeStart');
            remove.classList.toggle('trash-resume');
        } else {
            taskDiv.classList.toggle('divResume');
            remove.classList.toggle('trash');
            newTask.style.margin = '0';

        }

        if (resumeContent.length > 135) {
            taskResume.appendChild(angle);
            angle.style.display = 'block';
        }

        newTaskContainer.style.alignItems = "center";

        // Adicionando classes aos elementos
        newTaskContainer.classList.add('containerTaskNew');

        // Adicionando elementos ao taskDiv
        taskList.appendChild(taskDiv);
            
        taskDiv.appendChild(newTaskContainer);
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(remove);
        
            taskDiv.appendChild(remoEdit);
                remoEdit.appendChild(remove);
                remoEdit.appendChild(edit);
        

        // Limpar campos
        inputText.value = '';
        document.getElementById('notasText').value = '';
        inputText.focus();
        inputAtive();
    } else {
        return;
    }
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
    minutes = 5;
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
        if (document.body.classList.contains("descansar-bg")) {
            if (minutes + 5 <= 20) {
                minutes += 5;
            } else {
                minutes = 20;
            }
        } else {
            minutes += 15;
        }
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

