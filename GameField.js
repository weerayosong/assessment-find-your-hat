'use strict';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

const HATCHET = '^';
const HOLE = 'x';
const FIELD = '+';
const PLAYER_PATH = '*';

export default class GameField {
    constructor(field, playerName) {
        this.field = field;
        this.playerName = playerName;
        this.locationX = 0;
        this.locationY = 0;
        this.isPlaying = true;
    }

    printMap() {
        console.clear();
        console.log(`\n=== 🪓 Find your Hat(chet) ===`);
        console.log(`You: ${this.playerName}\n`);
        for (let row of this.field) {
            console.log(row.join(''));
        }
        console.log('');
    }

    moveUp() {
        this.locationY -= 1;
    }
    moveDown() {
        this.locationY += 1;
    }
    moveLeft() {
        this.locationX -= 1;
    }
    moveRight() {
        this.locationX += 1;
    }

    askMove() {
        const move = prompt(
            `Where's my hat(chet)? I.. need.. need... (W = moveup, S = movedown, A = moveleft, D = moveright) then 'press ENTER': `,
        ).toUpperCase();
        switch (move) {
            case 'W':
                this.moveUp();
                break;
            case 'S':
                this.moveDown();
                break;
            case 'A':
                this.moveLeft();
                break;
            case 'D':
                this.moveRight();
                break;
            default:
                console.log('Wrong! ONLY W, A, S, D or try my Wrath!!');
                this.askMove();
                break;
        }
    }

    checkGameStatus() {
        if (
            this.locationY < 0 ||
            this.locationY >= this.field.length ||
            this.locationX < 0 ||
            this.locationX >= this.field[0].length
        ) {
            console.log(
                `\nHow dare! ${this.playerName} Argh!! Where am i NOW!? \nYou OUT!`,
            );
            this.isPlaying = false;
            return;
        }

        const currentTile = this.field[this.locationY][this.locationX];

        if (currentTile === HATCHET) {
            console.log(
                `\nWow! ${this.playerName}! Heh heh, Nice Hatchet i wanna use it with you now, \nYou WIN!`,
            );
            this.isPlaying = false;
        } else if (currentTile === HOLE) {
            console.log(
                `\nNooooo! ${this.playerName} Why you push me to this trap! \nYou LOSE!`,
            );
            this.isPlaying = false;
        } else {
            this.field[this.locationY][this.locationX] = PLAYER_PATH;
        }
    }

    play() {
        while (this.isPlaying) {
            this.printMap();
            this.askMove();
            this.checkGameStatus();
        }
    }
}
