import { Component, OnInit, Input, transition } from '@angular/core';
import { InterestsService } from '../../../services/interests.service'

@Component({
  selector: 'point-card',
  templateUrl: './point-card.component.html',
  styleUrls: ['./point-card.component.css']
})
export class PointCardComponent implements OnInit {

  @Input() point: any;
  interestCount: number;
  interestCountFound: boolean = false;

  constructor(private interestsService: InterestsService) { }

  ngOnInit() {
    this.getInterests();
  }

  getInterests() {
    this.interestsService.getPointInterests(this.point['_id']).subscribe(interests => this.onGetInterestsSuccess(interests));
  }

  onGetInterestsSuccess(interests) {   

    this.interestCount = interests.length;
    this.interestCountFound = true;
  }



}
