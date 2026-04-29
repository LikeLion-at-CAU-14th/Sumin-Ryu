import Button from "./button.js";
import Div from "./Div.js";


class Todo {
    constructor(todo) {
        this.row = new Div('','row').node; // <div class="row"></div>
        this.textBox = new Div(todo,'text-box');
        this.completeBtn = new Button('완료', 'complete-btn', 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fstatic9.depositphotos.com%2F1431107%2F1143%2Fi%2F450%2Fdepositphotos_11437164-stock-photo-green-tick.jpg&type=sc960_832');
        this.delBtn = new Button('삭제', 'del-btn', 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F9759%2F9759144.png&type=sc960_832');
    }


addRow() {
    [this.textBox, this.completeBtn, this.delBtn].forEach((dom) => {
        this.row.appendChild(dom.node);
    })
    return this.row;
}

getRow (){
    return this.row;
}

getCompleteBtn (){
    return this.completeBtn.node;
}

getDelBtn (){
    return this.delBtn.node;
}

getInnerText(){
    return this.textBox.node;
}
}

export default Todo;