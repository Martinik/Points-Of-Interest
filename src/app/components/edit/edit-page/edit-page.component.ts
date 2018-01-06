import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PointsService } from '../../../services/points.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  id: string; 
  point: Object;
  shouldDisplayPractical: boolean;
  shouldDisplayRecreational: boolean;

  constructor(private route: ActivatedRoute, private service: PointsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    console.log(`inside edit page`);
    
        this.service.getPointById(this.id)
          .subscribe(recievedPoint => this.onGetPointSuccess(recievedPoint))
  }

  private onGetPointSuccess(recievedPoint) {
    console.log(`point recieved`);
    
    this.point = recievedPoint;
   
    
    if(this.point['type'] == 'practical'){
      this.shouldDisplayPractical = true;
    }

    if(this.point['type'] == 'recreational'){
      this.shouldDisplayRecreational = true;
    }

  }
 

}
