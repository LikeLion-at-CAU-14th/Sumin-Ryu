import Todo from "../DOM/Todo.js";
import CompleteController from "./CompleteController.js";

class TodoController {
    constructor(todo) {
        this.todoText = todo;
        this.newTodo = new Todo(todo);
        this.delBtnNode = this.newTodo.getDelBtn();
        this.comBtnNode = this.newTodo.getCompleteBtn();
        this.isChecked = false;

        this.delBtnNode.addEventListener('click', () => {
            this.delTodo();
        });

        this.comBtnNode.addEventListener('click', () => {
            this.toggleCheck();
            
        });
    }

    toggleCheck() {
        this.isChecked = !this.isChecked;
        this.newTodo.getInnerText().classList.toggle('done-text');
        this.comBtnNode.classList.toggle('done-btn');
    }

    moveTodo() {
        this.delTodo();
        const completeController = new CompleteController(this.todoText);
        completeController.addComplete();
    }

        addTodo () {
            const todoList = document.getElementById("to-do-list");
            const input = document.querySelector('input');
            todoList.appendChild(this.newTodo.addRow());
            input.value = '';
        }

        delTodo(){
            const todoList = document.getElementById("to-do-list");
            todoList.removeChild(this.newTodo.getRow());
        }

        moveTodo() {
            this.delTodo();
            const completeController = new CompleteController(this.todoText);
            completeController.addComplete();
        }
}

export default TodoController;