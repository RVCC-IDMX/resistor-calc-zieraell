import { getResistorOhms } from './resistor.js';

const container = document.querySelector('.selection');

const calcBand1 = document.querySelector('#b0');
const calcBand2 = document.querySelector('#b1');
const calcMultiplier = document.querySelector('#b2');
const calcTolerance = document.querySelector('#b3');

const answer = document.querySelector('.answer');

const LOCAL_STORAGE_BANDS_KEY = 'resistor.bands';

let bands = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BANDS_KEY)) || { color1 : "red", color2: "green", multiplier: "violet", tolerance: "gold" };

function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_BANDS_KEY, JSON.stringify(bands));
}

function render() {
    // update band colors
    calcBand1.className = bands.color1;
    calcBand2.className = bands.color2;
    calcMultiplier.className = bands.multiplier;
    calcTolerance.className = bands.tolerance;

    // update answer
    answer.textContent = getResistorOhms(bands);
}

container.addEventListener('click', (e) => {
    e.preventDefault();
    // gets click target's color value by splitting it's class string
    const newColor = e.target.className.split(' ')[1];
    // gets click target's parent container id using parentNode
    const newBand = e.target.parentNode.id;

    switch(newBand) {
        case "color0":
            bands.color1 = newColor;
            break;
        case "color1":
            bands.color2 = newColor;
            break;
        case "color2":
            bands.multiplier = newColor;
            break;
        case "color3":
            bands.tolerance = newColor;
            break;
    }
    saveAndRender();
})

render();