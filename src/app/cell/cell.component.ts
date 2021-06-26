import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/models/board';
import { Cell } from 'src/models/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  constructor() { }

  @Input()
  cell: Cell;

  @Input()
  board: Board;

  ngOnInit(): void {
  }

  selectSquare(): void {
    if (this.cell.preset) {
      return;
    }

    this.board.selectCell(this.cell)
  }

}
