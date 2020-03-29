import "../scss/index.scss";
import { Light } from "./classes/light.js";
import { controller as Controller } from "./classes/controller.js";

let GreenLight = new Light("GreenLight", ["rgb(0, 102, 0)", "rgb(51, 204, 51)"]);
let RedLight = new Light("RedLight", ["rgb(102, 0, 0)", "rgb(204, 51, 51)"]);
let BlueLight = new Light("BlueLight", ["rgb(0, 0, 102)", "rgb(51, 51, 204)"]);

Controller.getLightClasses([GreenLight, RedLight, BlueLight]);
Controller.createBlinkOrder(document.getElementsByClassName("light").length);

window.onClick = (light, id) => {
    let lights = [GreenLight, RedLight, BlueLight];
    if(light === window.event.target.id) {
        console.log(lights[id])
        lights[id].blink();
    }
}

window.start = () => {
    Controller.blinkLights();
    document.getElementsByClassName("turn")[0].style.display = "block";
    document.querySelector("main").style.display = "block";
    document.querySelector("button").style.display = "none";
}