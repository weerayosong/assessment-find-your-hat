'use strict';
import promptSync from 'prompt-sync';
import GameField from './GameField.js';

//sigint: true >> let you (ctrl+c) to terminate you current trminal
const prompt = promptSync({ sigint: true });

console.clear();
console.log('Assessment | Find your Hat(chet)!');
const name = prompt(`Your name(or I'll call you Jason13th?): `);

//hard code map here
const map = [
    ['*', '+', 'x'],
    ['+', 'x', '+'],
    ['+', '+', '^'],
];

// init & invoke
const game = new GameField(map, name || 'Jason13th');
game.play();
