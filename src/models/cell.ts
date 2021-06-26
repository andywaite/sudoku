export class Cell {
    value: number|null;
    preset: boolean = false;

    constructor(value: number|null) {
        this.value = value

        if (value !== null) {
            this.preset = true
        }
    }
}
