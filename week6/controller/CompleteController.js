import Complete from "../DOM/Complete.js";

class CompleteController {
    constructor(todoText) {
        this.newComplete = new Complete(todoText);
        this.delBtnNode = this.newComplete.getDelBtn();

        this.delBtnNode.addEventListener('click', () => {
            this.delComplete();
        });
    }

    addComplete() {
        const completeList = document.getElementById("complete-list");
        completeList.appendChild(this.newComplete.addRow());
    }

    delComplete() {
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newComplete.getRow());
    }
}

export default CompleteController;