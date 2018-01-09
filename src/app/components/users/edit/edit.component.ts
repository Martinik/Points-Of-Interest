import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() user: Object;
  @Input() userIsAdmin: boolean;
  editForm: FormGroup;
  name: string = '';
  email: string = '';
  avatarUrl: string = '';
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private service: UsersService, private auth: AuthenticationService, private fb: FormBuilder,
    private router: Router, private notificationService: NotificationsService) {
    this.editForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)])],
      'avatarUrl': ['', null]
    })
  }



  ngOnInit() {
    this.editForm.patchValue({ name: this.user['name'] })
    this.editForm.patchValue({ email: this.user['email'] })
    this.editForm.patchValue({ avatarUrl: this.user['avatarUrl'] })
    console.log(this.user);

  }

  onSubmit(post) {
    this.name = post.name;
    this.email = post.email;
    this.avatarUrl = post.avatarUrl;

    let editModel = this.user;


    editModel['name'] = post.name;
    editModel['email'] = post.email;
    editModel['avatarUrl'] = post.avatarUrl;

    // https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png

    if (!editModel['avatarUrl'] || editModel['avatarUrl'].length <= 0) {

      editModel['avatarUrl'] = `https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png`;
    }

    this.service.editUser(this.user['_id'], editModel)
      .subscribe(data => this.onEditSuccess(data));

  }

  onEditSuccess(data) {

    if (this.auth.userId === data['_id']) { //change the logged user info only if changed by profile owner, NOT by Admin

      this.auth.authtoken = data['_kmd']['authtoken'];
      this.auth.userId = data['_id'];
      localStorage.setItem('authtoken', data['_kmd']['authtoken']);
      localStorage.setItem('username', data['username']);
      localStorage.setItem('userId', data['_id']);

      this.auth.changeUser(data);

    }

    this.router.navigate([`/user/profile/${this.user['username']}`]);


    this.notificationService.success('User Edited')

  }

  deleteUser(e) {

    if (confirm(`Are you sure you want to delete ${this.user['username']}? \n The user will be permanently removed!`) == true) {
      this.service.deleteUser(this.user['_id'])
        .subscribe(deleteUserData => this.onDeleteSuccess(deleteUserData));
    }

  }

  onDeleteSuccess(deleteUserData) {
   

    console.log(`about to delete interest of ` + this.user['username']);

    this.service.deleteUserInterests(this.user['_id'])
      .subscribe(deleteInterestData => this.onDeleteInterestsSuccess(deleteInterestData))
  }

  onDeleteInterestsSuccess(deleteInterestData) {
    console.log(`User interests deleted`);
    console.log(`Delete data:`);
    console.log(deleteInterestData);

    this.router.navigate(['/home'])

    this.notificationService.success('User Deleted');
  }

}
