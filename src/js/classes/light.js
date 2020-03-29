import {controller as Controller} from "./controller.js";

export class Light 
{
    durationInMS;
    name;
    activeColor;
    colors;
    toggleState;

    constructor(name, colors) {
        this.colors = colors;
        this.toggleState = false;
        this.durationInMS = Controller.getBlinkDuration();
        this.activeColor = this.colors[0];
        this.name = name;
        console.log(this.name + " has been created")
        document.getElementById(name).style.background = this.activeColor;

    }

    updateToggle = () => { 
        this.toggleState = this.toggleState ? false : true;
        this.activeColor = this.toggleState ? this.colors[1] : this.colors[0] ;
        document.getElementById(this.name).style.background = this.activeColor;
    }

    blink = () => {
        this.updateToggle();
        window.setTimeout( this.updateToggle, this.durationInMS)        
    }

    onClick = () => {
        console.log("clicked light "+this.name)
    }

    toString = () => console.log(JSON.parse(JSON.stringify(this)));
}