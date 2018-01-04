import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PointsService } from '../../../services/points.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  id: string;
  point: Object;

  constructor(private route: ActivatedRoute, private service: PointsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.service.getPointById(this.id)
      .subscribe(recievedPoint => this.onGetPointSuccess(recievedPoint))
  }

  private onGetPointSuccess(recievedPoint) {
    this.point = recievedPoint;
    // console.log(this.point);
  }
 
}
