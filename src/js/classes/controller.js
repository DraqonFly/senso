class Controller
{
    blinkOrder;
    blinkDuration;
    blinkOrderLength = 5;
    lights;

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

            this.lights[lightID].blink();

            loops++;
            if(loops === this.blinkOrder.length) {
                window.clearInterval(this.interval)
            }
        }, 2000)
    }

    createRandomInteger = (maxLightCount) => Math.floor(Math.random() * (maxLightCount - 1 + 1 ));

    toString = () => JSON.parse(JSON.stringify(this))
}

export let controller = new Controller(1000);