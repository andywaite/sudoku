import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.start = (Date.now() / 1000);

    setInterval(() => {
      const diff = (Date.now() / 1000) - this.start;
      this.hours = Math.floor(diff / 3600);
      this.minutes = Math.floor((diff % 3600) / 60);
      this.seconds = Math.floor(diff % 60);

    }, 1000)
  }

}
