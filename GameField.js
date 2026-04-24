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
    // static นิ่งๆ ทื่อๆ บื้อๆ แต่ง่าย จะเรียกก็เรียก ไม่ต้องสร้าง object ไม่ต้องชี้เป้า เรียกก็ทำ
    static generateField() {
        let size = 0;

        // wanna play game with me? while(!true) you'll stay here with 😈 me forever!
        while (size < 3 || size > 6 || isNaN(size)) {
            const input = prompt(
                `How big is your playground [Oh~! how long you can run away from me? :)]? (Enter 3 - 6 for 3x3 to 6x6 Map): `,
            );
            size = parseInt(input, 10);

            if (size < 3 || size > 6 || isNaN(size)) {
                console.log(`Don't play games with me... I said 3 to 6!!`);
            }
        }

        // 1. สร้าง Array 2 มิติเปล่าๆ + (FIELD)
        const field = new Array(size)
            .fill(0)
            .map(() => new Array(size).fill(FIELD));

        // 2. สุ่มตำแหน่งขวาน (ต้องไม่ทับจุดเกิด 0,0)
        // 👿 Crap! I caught you now, the one who hid my hat(chet).
        let hatchetX = 0;
        let hatchetY = 0;
        while (hatchetX === 0 && hatchetY === 0) {
            hatchetX = Math.floor(Math.random() * size);
            hatchetY = Math.floor(Math.random() * size);
        }
        field[hatchetY][hatchetX] = HATCHET;

        // 3. 😈 You don't need to random my respawn pos, with my hat(chet) in hand, I ALWAYS FOUND YOU! :) 🪓🩸
        field[0][0] = PLAYER_PATH;

        // 4. เพิ่มความยาก แมพใหญ่ หลุมเยอะขึ้น 20%
        const totalHoles = Math.floor(size * 1.2); // 3x1.2=3.6=>3หลุม, 4x1.2=4.8=>4หลุม, 5x1.6=>6หลุม, 6x1.2=7.2=>7หลุม

        // 5. หลุมวางสุดท้ายเพราะ ไม่สำคัญเท่า ตัวละคร ขวาน
        let holesPlaced = 0;
        while (holesPlaced < totalHoles) {
            const hX = Math.floor(Math.random() * size);
            const hY = Math.floor(Math.random() * size);

            // ต้องเช็คว่าช่องนั้นว่างอยู่ (ไม่ทับจุดเกิด ไม่ทับขวาน และยังไม่มีหลุม)
            if (field[hY][hX] === FIELD) {
                field[hY][hX] = HOLE;
                holesPlaced++;
            }
        }

        return field;
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
