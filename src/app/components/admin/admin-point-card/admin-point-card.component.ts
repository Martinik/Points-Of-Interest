import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PointsService } from '../../../services/points.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'admin-point-card',
  templateUrl: './admin-point-card.component.html',
  styleUrls: ['./admin-point-card.component.css']
})
export class AdminPointCardComponent implements OnInit {

  @Input() point: Object;
  @Output() pointDeleted: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private service: PointsService, private notificationService: NotificationsService) { }

  ngOnInit() {
  }

  deletePoint() {

    if (confirm("Are you sure you want to delete this Point?") == true) {
      this.service.deletePointInterests(this.point['_id'])
      .subscribe(deleteInterestsData => {
        this.service.deletePointById(this.point['_id'])
        .subscribe(deletePointData => this.onDeletePointSuccess(deletePointData))
      })
    } 

  }


  onDeletePointSuccess(deleteUserData) {
  
    this.pointDeleted.emit(this.point);

    this.notificationService.success('Point Deleted');
  }

}
