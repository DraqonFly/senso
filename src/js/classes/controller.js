import { Light } from "./light.js";


class Controller
{
    hp;
    blinkOrder;
    blinkDuration;
    blinkOrderLength;
    lights;
    record = false;
    recordCount = 0;

    constructor(initialBlinkDuration)
    {
        this.blinkDuration = initialBlinkDuration;
        this.hp = 3;
        this.blinkOrderLength = 3;
    }

    addLight = () => {
        console.log("adding another light");
        let added = false;
        [...document.querySelectorAll(".lightouter")].forEach ( elem => {
            if(added === false){
            switch(this.lights.length) {
                case 3: added = true; this.lights.push(new Light("YellowLight", ["#D5B85A", "#FFF200"])); document.getElementsByClassName("YellowLight")[0].style.display = "block"; break;
                case 4: added = true; this.lights.push( new Light("OrangeLight", ["#B3672B", "#FD6A02"])); document.getElementsByClassName("OrangeLight")[0].style.display = "block"; break;
                case 5: added = true; this.lights.push(new Light("SilverLight", ["grey", "#D9DDDC"])); document.getElementsByClassName("SilverLight")[0].style.display = "block"; break;
                case 6: added = true; this.lights.push(new Light("LightOrange", ["#ffc003", "#ffe6a6"])); document.getElementsByClassName("LightOrange")[0].style.display = "block"; break;
                case 7: added = true; this.lights.push( new Light("LightBlue", ["#00cee6", "#baf8ff"])); document.getElementsByClassName("LightBlue")[0].style.display = "block"; break;
                case 8: added = true; this.lights.push(new Light("LightGreen", ["#0fe600", "#c8ffc4"])); document.getElementsByClassName("LightGreen")[0].style.display = "block"; break;
                case 9: added = true; this.lights.push(new Light("LightRed", ["#ff2626", "#ffc4c4"])); document.getElementsByClassName("LightRed")[0].style.display = "block"; break;
            }
            }
            elem.style.width = (100 / (this.lights.length + 1))+"%";
            elem.style.height= ((100 / (this.lights.length + 1)) * 3.333) +"%";
        })
    }

    getLightClasses = (classes) => {
        this.lights = classes;
    }

    getBlinkDuration = () => {
        return this.blinkDuration;
    }

    createBlinkOrder = (maxLightCount) => {
        console.log(this.lights)
        let blinkOrderValues = [];
        for(let i = 0; i < this.blinkOrderLength; i++) { 
            blinkOrderValues.push(this.createRandomInteger(maxLightCount));
        }
        this.blinkOrder = blinkOrderValues;
        return blinkOrderValues;
    }

    blinkLights = () => {
        let loops = 0;
        this.interval = window.setInterval( () => {
            console.log("shine")
            let lightID = this.blinkOrder[loops];

            if(this.lights[lightID]) {
                this.lights[lightID].blink();
            }
            loops++;
            if(loops === this.blinkOrderLength) {
                window.setTimeout(() => {
                    document.getElementsByClassName("turn")[0].innerHTML = "Its your turn now!";
                    document.getElementsByClassName("turn")[0].style.color = "rgb(175, 255, 175)";
                    console.log(this.blinkOrder)
                    this.record = true;
                    this.recordCount = 0;
                    window.clearInterval(this.interval)
                }, 2000)

            }
        }, 2000)
    }
    createRandomInteger = (maxLightCount) => {
        console.log(this.lights.length)
        return Math.floor(Math.random() * (this.lights.length )
        )} 

    toString = () => JSON.parse(JSON.stringify(this))
}
export let controller = new Controller(1000);