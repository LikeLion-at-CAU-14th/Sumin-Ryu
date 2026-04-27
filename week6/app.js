import TodoController from "./controller/TodoController.js";
import Button from "./DOM/button.js";

const inputBox = document.getElementById('input-box');
const input = document.querySelector('input');
const todoControllers = [];

const addBtn = new Button('추가', 'input', 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.freepik.com%2F256%2F11880%2F11880137.png&type=sc960_832');
inputBox.appendChild(addBtn.node);

addBtn.node.addEventListener('click', () => {
    if (!input.value.trim()) return;
    const todoController = new TodoController(input.value.trim());
    todoController.addTodo();
    todoControllers.push(todoController);
    input.value = '';
});

const moveAllBtn = document.getElementById('move-all');
moveAllBtn.addEventListener('click', () => {
    const checked = todoControllers.filter(tc => tc.isChecked);
    checked.forEach(tc => {
        tc.moveTodo();
        todoControllers.splice(todoControllers.indexOf(tc), 1);
    });
});