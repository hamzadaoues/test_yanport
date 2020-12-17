import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})


export class GridComponent implements OnInit, OnChanges {

  @Input() public x: number;
  @Input() public y: number;
  @Input() public positionX: number;
  @Input() public positionY: number;
  @Input() public direction: string;

  counter: any;

  static numberReturn(length) {
    return new Array(length);
  }

  constructor() {
  }

  ngOnInit() {
    this.x = 3;
    this.y = 4;
    this.counter = GridComponent.numberReturn(this.x * this.y);
    this.positionX = 0;
    this.positionY = 0;
    this.direction = 'N';
  }

  // Handle the change of inputs
  ngOnChanges(changes: SimpleChanges): void {
    this.counter = GridComponent.numberReturn(this.x * this.y);
  }

  isPosition(i: number) {
    const currentX = ((i) % this.x);
    const currentY = this.y - (Math.floor((i) / this.x) + 1);
    return currentX === this.positionX && currentY === this.positionY;
  }
}
