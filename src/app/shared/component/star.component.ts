import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ak-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  constructor() {}

  @Input() rating: number;
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();
  starWidth: number;

  ngOnChanges(): void {
    this.starWidth = (this.rating * 150) / 10;
  }

  onClick() {
    this.notifyParent.emit(`The selected Rating value is ${this.rating}`);
  }

  AlertMessage() {
    alert('Hello from Star Component' + this.starWidth);
  }
}
