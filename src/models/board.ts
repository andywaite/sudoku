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
