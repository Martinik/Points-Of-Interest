import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service';
import { UsersService } from '../../../services/users.service';
import { PointsService } from '../../../services/points.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  
  query: string;
  shouldDisplayUsers: boolean;
  shouldDisplayPoints: boolean;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private us: UsersService, private ps: PointsService) { }

  ngOnInit() {
    
    this.subscribeToRoute();

  }


  private subscribeToRoute() {
    this.route.params.subscribe(
      params => {
        this.query = params['query'];
        this.decideDisplay();

      });
  }


  

  decideDisplay(){
   
    
    if(this.query){
     
      if(this.query.toLocaleLowerCase() === 'users'){
        this.shouldDisplayUsers = true;
        this.shouldDisplayPoints = false;
      }
      if(this.query.toLocaleLowerCase() === 'points'){
        this.shouldDisplayUsers = false;
        this.shouldDisplayPoints = true;
      }
    } else {
      this.shouldDisplayUsers = false;
      this.shouldDisplayPoints = false;
    }

  }

  

}
