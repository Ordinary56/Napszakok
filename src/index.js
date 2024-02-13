"use strict";
//@ts-check

/**@typedef {Object} Quote
 * @property {string} text
 * @property {string} author
 */

const API_URL = "https://type.fit/api/quotes";

/**@type {Quote[]} */
const quotes = await fetch(API_URL).then(res => res.json());

window.onload = (e) => {
    PickQuote(document.getElementsByClassName('refresh')[0]);
    console.log('loaded')
    console.log(e)
};

/**
 * Kinda works like Python's range() 
 * @param {number} size 
 * @param {number?} startAt 
 * @returns {ReadonlyArray<number>} 
 */
const range = (size, startAt = 0) => {
    return [...Array(size).keys()].map(i => i + startAt);
}

const DisplayTime = () => {
    const date = new Date();
    document.getElementById("date").children[1].children[0].textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if(range(12,1).includes(date.getHours()) && range(60).includes(date.getMinutes())) {
        /**@type {HTMLImageElement} */
        document.getElementById('weathericon').src = './pictures/sun.svg';
        
        document.body.style.backgroundImage = `url('./pictures/morning.png')`;
    }
    else if(range(20,12).includes(date.getHours()) && range(60).includes(date.getMinutes())) {
        document.body.style.backgroundImage = `url('./pictures/afternoon.png')`;
    }
    else if([20,21,22,23,0,1,2,3,4,5].includes(date.getHours()) && range(60).includes(date.getMinutes())) {
        document.body.style.backgroundImage = `url('./pictures/night.png')`;
    }
    
}

document.getElementsByClassName('refresh')[0].addEventListener('click', e => {
    PickQuote(e.target);
});

/**
 * 
 * @param {HTMLElement} elem 
 */
const PickQuote = (elem) => {
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)]; 
    const paragraphs = elem.parentElement.parentElement.getElementsByTagName('p'); 
    paragraphs[0].textContent = `"${selectedQuote.text}"`;
    paragraphs[1].textContent = selectedQuote.author.split(',')[0];
}

// Update minden másodpercben
setInterval(DisplayTime, 1000);