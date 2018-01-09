import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { PointsService } from '../../../services/points.service';

@Component({
  selector: 'admin-card-holder',
  templateUrl: './admin-card-holder.component.html',
  styleUrls: ['./admin-card-holder.component.css']
})
export class AdminCardHolderComponent implements OnInit {

  @Input() type: string = '';
  @Input() array: Object[] = [];
  count: number = 0;

  constructor(private us: UsersService, private ps: PointsService) { }

  ngOnInit() {
   
    this.type = this.type.toUpperCase();

    this.initArray();
    
  }

  initArray(){
    if(this.type.toUpperCase() === 'USERS'){
      this.initUsers();
    }

    if(this.type.toUpperCase() === 'POINTS'){
      this.initPoints();
    }
  }

  initUsers(){
    this.us.getAllUsers().subscribe(users => {
      this.array = users
      this.count = this.array.length;
    });
  }

  initPoints(){
    this.ps.getAllPoints().subscribe(points => {
      this.array = points
      this.count = this.array.length;
    });
  }


  removeFromArray(element){
    this.array = this.array.filter(e => e['_id'] !== element['_id'])
  }

 

}
