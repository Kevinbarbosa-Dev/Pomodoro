// Classe Todo
class Todo {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

// Classe TodoList
class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(title, description) {
        const newTodo = new Todo(title, description);
        this.todos.push(newTodo);
        this.render();
    }

    removeTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos.splice(index, 1);
            this.render();
        }
    }

    completeTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].complete();
            this.render();
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        this.todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = `${todo.title}: ${todo.description}`;
            if (todo.completed) {
                li.classList.add('completed');
            }
            li.appendChild(this.createCompleteButton(index));
            li.appendChild(this.createDeleteButton(index));
            todoList.appendChild(li);
        });
    }

    createCompleteButton(index) {
        const button = document.createElement('button');
        button.textContent = 'Complete';
        button.onclick = () => this.completeTodo(index);
        return button;
    }

    createDeleteButton(index) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.onclick = () => this.removeTodo(index);
        return button;
    }
}

const myTodoList = new TodoList();

function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    if (title && description) {
        myTodoList.addTodo(title, description);
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }
}

myTodoList.render();
