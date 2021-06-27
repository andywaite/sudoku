export class Cell {
    value: number|null;
    preset: boolean = false;
    conflict: boolean = false;
    x: number;
    y: number;

    constructor(x: number, y: number, value: number|null) {
        this.value = value
        this.x = x;
        this.y = y;

        if (value !== null) {
            this.preset = true
        }
    }
}
