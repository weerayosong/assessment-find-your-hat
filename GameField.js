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
            `Where's my hat(chet)? I.. need.. need... (W = UP, S = DOWN, A = LEFT, D = RIGHT) the 'press ENTER': `,
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

    checkGameStatus() {}
    // next commit

    play() {
        while (this.isPlaying) {
            this.printMap();
            this.askMove();
        }
    }
}
