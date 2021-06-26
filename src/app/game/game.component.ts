import { Component, OnInit } from '@angular/core';
import { Board } from 'src/models/board';
import { BoardLoader } from 'src/services/board-loader.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private boardLoader: BoardLoader) { }
  board: Board;

  async ngOnInit(): Promise<void> {
    this.board = await this.boardLoader.loadBoard();
  }

}
