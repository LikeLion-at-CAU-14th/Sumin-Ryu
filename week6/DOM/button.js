import DOM from "./DOM.js";

class Button extends DOM {
    constructor(innerText, className, iconSrc) {
        super('button', '', className);

        const img = new Image();
        img.src = iconSrc;
        img.style.width = '16px';
        img.style.height = '16px';
        this.node.appendChild(img);
    }
}

export default Button;