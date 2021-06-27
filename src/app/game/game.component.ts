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

    document.addEventListener('keydown', (e:KeyboardEvent) => {
      const guess = Number.parseInt(e.key);

      if (!Number.isInteger(guess)) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          this.board.clearSelectedCell();
        }
        
        return;
      }
  
      if (guess >= 1 && guess <= 9) {
        this.board.play(guess);
      }
    });
  }

}
