import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { DEFAULT_TIME } from '../app.constant';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  readonly defaultTime = DEFAULT_TIME;

  private _start = false;
  @Input() set start(val) {
    this._start = val;
    if (val) {
      this.time = this.defaultTime;
      this.lastBest = this.records.best;
      this.startTimer();
    } else if (this.timer) {
      this.timesUp.emit(this.time);
      this.timer.unsubscribe();
    }
  }
  get start() {
    return this._start;
  }

  @Input() score;

  time = this.defaultTime;
  timer;

  @Output() timesUp = new EventEmitter();

  @Input() records = {
    best: 0,
    last: 0
  };
  lastBest = this.records.best;

  constructor() { }

  ngOnInit(): void {
    this.lastBest = this.records.best;
  }

  startTimer() {
    this.timer = timer(1000, 1000).subscribe(res => {
      if (res === this.defaultTime) {
        this.time = 0;
        this.timesUp.emit(0);
        this.timer.unsubscribe();
        this.timer = null;
      } else {
        this.time--;
      }
    });
  }
}
