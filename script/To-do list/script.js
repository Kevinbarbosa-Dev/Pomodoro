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


function task() {
    const modalTodoValue = document.getElementById('modalTodo').value.trim();
    const todoValue = document.getElementById("todo").value.trim();
    const notasText = document.getElementById("notasText").value.trim();
    const inputText = modalTodoValue !== "" ? modalTodoValue : todoValue;

    let taskHTML = `
        <div class="task">
            <i class="checkbox" onclick="check_checkbox(this)"><i class="fa-regular fa-square"></i></i>
            <div class="containerTaskNew">
                <li class="taskEdit"><span>${inputText}</span></li>
    `;

    if (notasText) {
        taskHTML += `
            <div class="task-resume">
                <p class="text-resume">${notasText}</p>
            </div>
        `;
    }

    taskHTML += `
            </div>
            <div class="remoEdit">
                <button class="trash-resume" onclick="removeTask(this.parentNode.parentNode)"><i class="fa-solid fa-trash"></i></button>
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
            </div>
        </div>
    `;

    const taskDiv = document.createElement('div');
    taskDiv.innerHTML = taskHTML;

    const newTaskDiv = taskDiv.firstElementChild;
    const taskResume = newTaskDiv.querySelector('.task-resume');
    const angle = document.createElement('button');

    if (taskResume && taskResume.textContent.length > 135) {
        angle.innerHTML = '<i class="fa-solid fa-angles-down"></i>';
        angle.classList.add("angle");
        taskResume.appendChild(angle);
        angle.style.display = 'block';
        angle.addEventListener('click',function(){
            taskResume.classList.toggle('active');

            if (taskResume.classList.contains('active')) {
                return angle.innerHTML = `<i class="fa-solid fa-angles-up"></i>`;
            }
             angle.innerHTML = '<i class="fa-solid fa-angles-down"></i>';
        });
    }


    document.getElementById('tasks').appendChild(newTaskDiv);

    // Limpar campos e fechar modal
    document.getElementById("todo").value = "";
    document.getElementById("modalTodo").value = "";
    document.getElementById("notasText").value = "";

    document.getElementById('modal').style.display = 'none';

    inputAtive();
}


document.getElementById("todo").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        task();
    }

});

// Event listener para adicionar tarefa do modal
document.getElementById("addModal").addEventListener("click", function () {
    task();
});


function removeTask(taskDiv) {
    taskDiv.remove();
}

function check_checkbox(checkbox) {
    let isChecked = checkbox.innerHTML.includes("fa-check-square");
    if (isChecked) {
        checkbox.innerHTML = '<i class="fa-regular fa-square"></i>';
    } else {
        checkbox.innerHTML = '<i class="fa-solid fa-check-square"></i>';
    }
}


function inputAtive() {
    let adicionar = document.getElementById("addOk");
    let inputText = document.getElementById("todo").value.trim();
    adicionar.style.display = inputText !== "" ? "block" : "none";
}
function actAddModal() {
    let btnAddTaskModal = document.getElementById('addModal');
    let modalTodoValue = document.getElementById('modalTodo').value.trim();
    btnAddTaskModal.style.display = modalTodoValue !== "" ? "block" : "none";
};


function nota() {
    let modal = document.getElementById('modal');
    let closeModal = document.getElementById('fecharModal');
    modal.style.display = 'flex';
    if (window.innerWidth <= 980) {
        overlay.style.width = "0%";
        modal.style.display = "flex";
    }
    closeModal.addEventListener('click', function () {
    document.getElementById('modalTodo').value = "";
    document.getElementById('notasText').value = "";
    modal.style.display = 'none';
    });
}



