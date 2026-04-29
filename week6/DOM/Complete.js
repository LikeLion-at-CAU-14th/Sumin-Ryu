import Button from "./button.js";
import Div from "./Div.js";

class Complete {
    constructor(todo) {
        this.row = new Div('', 'row').node;
        this.textBox = new Div(todo, 'text-box');
        this.textBox.node.classList.add('done-text');
        this.delBtn = new Button('삭제', 'del-btn', 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F9759%2F9759144.png&type=sc960_832');
    }

    addRow() {
        [this.textBox, this.delBtn].forEach((dom) => {
            this.row.appendChild(dom.node);
        });
        return this.row;
    }

    getRow() { return this.row; }
    getDelBtn() { return this.delBtn.node; }
}

export default Complete;