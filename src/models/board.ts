import { Cell } from "./cell";

export class Board {
    cells: Array<Array<Cell>> = []
    selectedX: number|null = null;
    selectedY: number|null = null;
    isConflicted: boolean = false;
    isEnded: boolean = false;

    isSelectedCell(subject: Cell): boolean {
        if (this.selectedX === null || this.selectedY === null) {
            return false;
        }

        return this.cells[this.selectedX][this.selectedY] === subject;
    }

    checkEndState(): void {
        for (const row of this.cells) {
            for (const cell of row) {
                if (cell.value === null || cell.conflict) {
                    return;
                }
            }
        }

        this.isEnded = true;
    }

    clearSelectedCell(): void {
        if (this.selectedX === null || this.selectedY === null || this.isEnded) {
            return;
        }

        this.cells[this.selectedX][this.selectedY].value = null;

        this.isConflicted = false;
    }

    moveSelected(xDelta: number = 0, yDelta: number = 0) {
        if (this.selectedX == null || this.selectedY === null || this.isEnded) {
            return;
        }

        const targetX:number = this.selectedX + xDelta;
        const targetY:number = this.selectedY + yDelta;

        // Don't allow overflow
        if (targetX < 0 || targetX > 8 || targetY < 0 || targetY > 8) {
            return;
        }

        // Space is occupied, try skipping over
        if (this.cells[targetX][targetY].preset) {

            if (xDelta < 0) {
                xDelta -= 1;
            }

            if (xDelta > 0) {
                xDelta += 1;
            }

            if (yDelta < 0) {
                yDelta -= 1;
            }

            if (yDelta > 0) {
                yDelta += 1;
            }

            this.moveSelected(xDelta, yDelta);
            return;
        }

        this.selectedX = targetX;
        this.selectedY = targetY;
        return;
    }

    play(guess: number): void {
        if (this.selectedX === null || this.selectedY === null) {
            return;
        }

        this.cells[this.selectedX][this.selectedY].value = guess;

        if (this.isCellConflicted(this.cells[this.selectedX][this.selectedY])) {
            this.isConflicted = true;
        }

        this.checkEndState();
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

    isCellConflicted(subject: Cell): boolean {
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
