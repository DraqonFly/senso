class Controller
{
    blinkOrder;
    blinkDuration;
    blinkOrderLength = 5;
    lights;
    record;
    recordCount = 0;

    constructor(initialBlinkDuration)
    {
        this.blinkDuration = initialBlinkDuration;
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
            if(loops === this.blinkOrder.length) {
                window.setTimeout(() => {
                    document.getElementsByClassName("turn")[0].innerHTML = "Its your turn now!";
                    document.getElementsByClassName("turn")[0].style.color = "rgb(175, 255, 175)";
                    console.log(this.blinkOrder)
                    this.record = true;
                    window.clearInterval(this.interval)
                }, 2000)

            }
        }, 2000)
    }
    createRandomInteger = (maxLightCount) => Math.floor(Math.random() * (maxLightCount - 1 + 1 ));

    toString = () => JSON.parse(JSON.stringify(this))
}

export let controller = new Controller(1000);