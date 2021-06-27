import { Cell } from "./cell";

export class Board {
    cells: Array<Array<Cell>> = []
    selectedX: number|null = null;
    selectedY: number|null = null;

    isSelectedCell(subject: Cell): boolean {
        if (this.selectedX === null || this.selectedY === null) {
            return false;
        }

        return this.cells[this.selectedX][this.selectedY] === subject;
    }

    clearSelectedCell(): void {
        if (this.selectedX === null || this.selectedY === null) {
            return;
        }

        this.cells[this.selectedX][this.selectedY].value = null;
    }

    play(guess: number): void {
        if (this.selectedX === null || this.selectedY === null) {
            return;
        }

        this.cells[this.selectedX][this.selectedY].value = guess;
    }


    isCellInHighlightedRowOrColumn(subject: Cell): boolean {
        if (this.selectedX === null || this.selectedY === null) {
            return false;
        }

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.cells[x][y] === subject) {
                    return x === this.selectedX || y === this.selectedY;
                }
            }
        }

        return false;
    }

    getPeers(subject: Cell): Array<Cell> {
        const peers: Array<Cell> = [];

        for (let x: number = 0; x < 9; x++) {
            if (x == subject.x) {
                continue;
            }

            peers.push(this.cells[x][subject.y]);
        }

        for (let y = 0; y < 9; y++) {
            if (y == subject.y) {
                continue;
            }

            peers.push(this.cells[subject.x][y]);
        }

        const xGroupMin = Math.floor(subject.x / 3) * 3;
        const yGroupMin = Math.floor(subject.y / 3) * 3;
        const xGroupMax = xGroupMin + 2;
        const yGroupMax = yGroupMin + 2;

        const peerXY: Array<string> = [];


        for (let x: number = xGroupMin; x <= xGroupMax; x++) {
            for (let y: number = yGroupMin; y <= yGroupMax; y++) {
                if (x == subject.x && y == subject.y) {
                    continue;
                }
    
                peerXY.push(x + ":" + y);
                peers.push(this.cells[x][y]);
            }
        }

        return peers;
    }

    isConflicted(subject: Cell): boolean {
        if (subject.value === null) {
            return false;
        }

        for (const peer of this.getPeers(subject)) {
            if (peer.value === subject.value) {
                return true;
            }
        }

        return false;
    }

    selectCell(subject: Cell) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.cells[x][y] === subject) {
                    this.selectedX = x;
                    this.selectedY = y;
                }
            }
        }
    }
}
