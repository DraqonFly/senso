import "../scss/index.scss";
import { Light } from "./classes/light.js";
import { controller as Controller } from "./classes/controller.js";

let GreenLight = new Light("GreenLight", ["rgb(0, 102, 0)", "rgb(51, 204, 51)"]);
let RedLight = new Light("RedLight", ["rgb(102, 0, 0)", "rgb(204, 51, 51)"]);
let BlueLight = new Light("BlueLight", ["rgb(0, 0, 102)", "rgb(51, 51, 204)"]);

Controller.getLightClasses([GreenLight, RedLight, BlueLight]);

window.onClick = (light, id) => {
    if (Controller.record) {
        let lights = Controller.lights;
        if (light === window.event.target.id) {
            console.log(lights[id])
            lights[id].blink();

            if (id === Controller.blinkOrder[Controller.recordCount]) {
                console.log("correct")
            } 
            else {
                console.error("false");
                Controller.record = false;
                document.getElementsByClassName("turn")[0].innerHTML = "You have failed your turn!";
                document.getElementsByClassName("turn")[0].style.color = "red";
                document.getElementsByClassName("health__bar" + Controller.hp)[0].style.background = "red";
                window.setTimeout(() => {
                    document.getElementsByClassName("health__bar" + Controller.hp)[0].style.display = "none";
                    Controller.hp--;
                    document.getElementsByClassName("turn")[0].innerHTML = "Replaying same level!";
                    document.getElementsByClassName("turn")[0].style.color = "red";
                    Controller.recordCount = 0;

                    if (Controller.hp === 0) {
                        document.querySelector("main").innerHTML = "<h2> Game-Over </h2>";
                        document.querySelector("main").style.color = "red";
                        document.querySelector(".healthbar").style.display = "none";
                        document.querySelector(".turn").style.display = "none";
                        document.querySelector(".header__level").style.display = "none";
                    }

                    window.setTimeout(() => {
                        document.getElementsByClassName("turn")[0].innerHTML = "Its not your turn!";
                        document.getElementsByClassName("turn")[0].style.color = "orange";
                        blink(false);
                        return;
                    }, 2000)
                }, 2000)
            }
            if (Controller.recordCount === (Controller.blinkOrder.length - 1)) {
                Controller.record = false;
                window.setTimeout(() => {
                    document.getElementsByClassName("turn")[0].innerHTML = "You guesses were correct!";
                    document.getElementsByClassName("turn")[0].style.color = "lightgreen";
                    window.setTimeout(() => {
                        document.getElementsByClassName("header__level")[0].innerHTML = "lvl-" + (Controller.blinkOrderLength - 1).toString();;
                        document.getElementsByClassName("turn")[0].innerHTML = "Moving to next level!";
                        document.getElementsByClassName("turn")[0].style.color = "red";
                        Controller.recordCount = 0;
                        Controller.blinkOrderLength = Controller.blinkOrderLength + 1;
                        if ((Controller.blinkOrderLength + 1) % 4 === 0) {
                            Controller.addLight();
                            if (Controller.hp < 3) {
                                Controller.hp++;
                                document.getElementsByClassName("health__bar" + Controller.hp)[0].style.display = "block";
                            }
                        }
                        window.setTimeout(() => {
                            document.getElementsByClassName("turn")[0].innerHTML = "Its not your turn!";
                            document.getElementsByClassName("turn")[0].style.color = "orange";
                            blink(true);
                            return;
                        }, 2000)
                    }, 2000)
                }, 2000)
            }
            Controller.recordCount++;
        }
    }
}

window.start = () => {
    blink(true);
    document.getElementsByClassName("turn")[0].style.display = "block";
    document.querySelector("main").style.display = "flex";
    document.querySelector("button").style.display = "none";
    document.querySelector(".healthbar").style.display = "flex";
    document.querySelector(".header__level").style.display = "block";
}

window.blink = (newOrder) => {
    if (newOrder) {
        Controller.createBlinkOrder(Controller.blinkOrderLength);
    }
    Controller.blinkLights();
}

window.addLight = () => {
    Controller.addLight();
}