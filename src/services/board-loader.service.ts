import { Injectable } from '@angular/core';
import { Board } from 'src/models/board';
import { Cell } from 'src/models/cell';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class BoardLoader {

  constructor(private fileService: FileService) { }

	async loadBoard(): Promise<Board> {
    const data: Array<Array<null|number>> = await this.fileService.load('./assets/examples/extreme.json')
    const board = new Board()

    for (const x in data) {
      const row: Array<Cell> = [];
      for (const y in data[x]) {
        // @ts-ignore
        const cell = new Cell(data[x][y])
        row.push(cell);
      }

      board.cells.push(row);
    }

    return board
  }
}