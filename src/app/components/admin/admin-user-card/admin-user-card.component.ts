import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-user-card',
  templateUrl: './admin-user-card.component.html',
  styleUrls: ['./admin-user-card.component.css']
})
export class AdminUserCardComponent implements OnInit {

  @Input() user: Object;
  @Output() userDeleted: EventEmitter<Object> = new EventEmitter<Object>(); 

  constructor(private service: UsersService, private router: Router) { }

  ngOnInit() {
  }

  deleteUser() {

    if (confirm(`Are you sure you want to delete ${this.user['username']}? \n The user will be permanently removed!`) == true) {
      this.service.deleteUser(this.user['_id'])
        .subscribe(deleteUserData => this.onDeleteSuccess(deleteUserData));
    }

  }

  onDeleteSuccess(deleteUserData) {
    console.log(`User deleted`);
    console.log(`Delete data:`);
    console.log(deleteUserData);


    console.log(`about to delete interest of ` + this.user['username']);

    this.service.deleteUserInterests(this.user['_id'])
      .subscribe(deleteInterestData => this.onDeleteInterestsSuccess(deleteInterestData))
  }

  onDeleteInterestsSuccess(deleteInterestData) {
    console.log(`User interests deleted`);
    console.log(`Delete data:`);
    console.log(deleteInterestData);

    this.userDeleted.emit(this.user);
  }


}
