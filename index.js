'use strict';
import promptSync from 'prompt-sync';
import GameField from './GameField.js';

//sigint: true >> let you (ctrl+c) to terminate you current trminal
const prompt = promptSync({ sigint: true });

console.clear();
console.log('=== Assessment | Find your Hat(chet)! ===\n');
const name = prompt(`Your name (..or I'll call you 'Jason13th'?): `);

//hard code map here
// const map = [
//     ['*', '+', 'x'],
//     ['+', 'x', '+'],
//     ['+', '+', '^'],
// ];
// static method gen 3x3 to 6x6 map
const map = GameField.generateField();

// init & invoke
const game = new GameField(map, name || 'Jason13th');
game.play();
