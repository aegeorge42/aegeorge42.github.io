class ButtonList{
    constructor(){
        this.button_a = new PIXI.Sprite.fromImage("images/button.png");
    }

    addButton(){
        this.button_b = new PIXI.Sprite.fromImage("images/cat.png");
    }

    getButton(){
        return this.button_a;
    }
    
}
export {ButtonList}