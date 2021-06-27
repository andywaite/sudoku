import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/models/board';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor() { }

  start: number;
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  @Input()
  board: Board;

  ngOnInit(): void {
    this.start = (Date.now() / 1000);

    const interval = setInterval(() => {

      if (this.board.isEnded) {
        clearInterval(interval);
      }

      const diff = (Date.now() / 1000) - this.start;
      this.hours = Math.floor(diff / 3600);
      this.minutes = Math.floor((diff % 3600) / 60);
      this.seconds = Math.floor(diff % 60);

    }, 1000)
  }

}
