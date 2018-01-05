import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-point-card',
  templateUrl: './user-point-card.component.html',
  styleUrls: ['./user-point-card.component.css']
})
export class UserPointCardComponent implements OnInit {

  @Input() point: Object;

  constructor() { }

  ngOnInit() {
  }

}
