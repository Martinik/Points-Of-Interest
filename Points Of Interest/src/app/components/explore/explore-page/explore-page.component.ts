import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PointsService } from '../../../services/points.service'


@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {

  searchedPointType: string;
  points: any;

  constructor(private route: ActivatedRoute, private service: PointsService) { }

  ngOnInit() {
    this.subscribeToRoute();
  }
   

  getPoints() {
    
    this.points = undefined;

    this.searchedPointType = this.route.snapshot.paramMap.get('type');

    let endPointParam = this.searchedPointType;

    if (!this.searchedPointType || this.searchedPointType === 'all' || this.searchedPointType === '') {
      console.log(`getting ALL points`);
      this.service.getAllPoints()
        .subscribe(points => this.onGetPointsSuccess(points));
    } else {
      console.log(`getting points by TYPE`);
      this.service.getPointsByType(endPointParam)
        .subscribe(points => this.onGetPointsSuccess(points));
    }

    

  }

  private onGetPointsSuccess(recievedPoints: Object[]){

    this.points = recievedPoints;

    console.log('*******this.points:');
    console.log(this.points);
  }

  private subscribeToRoute() {
    this.route.params.subscribe(
      params => {
        this.searchedPointType = params['type'];
        this.getPoints();
      });
  }

}
