import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PointsService } from '../../../services/points.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'edit-recreational',
  templateUrl: './edit-recreational.component.html',
  styleUrls: ['./edit-recreational.component.css']
})
export class EditRecreationalComponent implements OnInit {

  @Input() point: Object;
  // @Input() interestedUsers: string[];

  editForm: FormGroup;
  // defaultInterestLevel: Number = 0;
  // form fields:
  title: string = '';
  description: string = '';
  // type: string = '';
  location: string = '';
  date: string = '';
  time: string = '';
  imgUrl: string = '';
  type: string = "recreational";


  minDate = Date.now();
  datePickerConfig = {
    disableKeypress: true,
    format: 'DD-MM-YYYY'
  }
  timePickerConfig = {
    disableKeypress: false,
    format: 'HH:mm'
  }


  properDateFormat;
  properTimeFormat;

  constructor(private ps: PointsService, private fb: FormBuilder, private router: Router,   private notificationService: NotificationsService) {

    this.editForm = fb.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      // 'type' : [null, Validators.required],
      'location': [null, Validators.required],
      'date': [null, ''],
      'time': [null, ''],
      'imgUrl': [null, '']
    })
  }




  ngOnInit() {


    this.editForm.patchValue({ title: this.point['title'] });
    this.editForm.patchValue({ description: this.point['description'] });
    this.editForm.patchValue({ location: this.point['location'] });
    // this.editForm.patchValue({ date: this.properDateFormat});
    this.editForm.patchValue({ date: this.point['date'] });
    // this.editForm.patchValue({ time: this.properTimeFormat });
    if (this.point['time']) {
      this.editForm.patchValue({ time: this.point['time'] });
    }

    if (!('' +this.point['imgUrl']).startsWith('./')) {
      this.editForm.patchValue({ imgUrl: this.point['imgUrl'] });
    } else {
      this.editForm.patchValue({ imgUrl: '' });
    }
    

  }



  onSubmit(post) {

    this.title = post.title;
    this.description = post.description;
    this.location = post.location;
    this.date = post.date;
    this.imgUrl = post.imgUrl;
    this.time = post.time;



    if (!post['time'] || ('' + post['time']).length <= 0) {
      this.time = undefined;
    } else if (!this.point['time'] || ('' + this.point['time']).length <= 0){

      //time is created in wrong format
      //fix:

      let timeAsNum = Date.parse(post['time']);
      let timeAsDate = new Date(timeAsNum);
      let wholeTime = timeAsDate.toTimeString().split(' ')[0];
      let timeWithoutSeconds = wholeTime.slice(0, -3);
      this.time = timeWithoutSeconds;



    } 



    //this line doesn't do what it is told...
    let editModel = this.point;


    editModel['title'] = this.title;
    editModel['description'] = this.description;
    editModel['type'] = this.type;
    editModel['location'] = this.location;
    editModel['date'] = this.date;
    editModel['time'] = this.time;
    editModel['imgUrl'] = this.imgUrl;

    editModel['interestedUsers'] = this.point['interestedUsers'];
    editModel['type'] = this.type;



    if (!editModel['imgUrl'] || editModel['imgUrl'].length <= 0) {

      editModel['imgUrl'] = `./../../../assets/images/noimage.png`;
    }

    this.ps.editPoint(this.point['_id'], editModel).subscribe(
      data => { this.editSuccess(data) },
      error => { this.editError(error) }
    )


  }

  editSuccess(data) {
    this.router.navigate([`/details/${this.point['_id']}`]);
    this.notificationService.success('Point Edited');
  }

  editError(error) {
    this.notificationService.error('Failed to Edit');
  }

  clearTime() {
    let timeElement = document.querySelector("#time input")
    timeElement['value'] = ''
  
  }

  tryDelete(){
    if (confirm("Are you sure you want to delete this Point?") == true) {
      this.deletePoint();
    } 
  }

  deletePoint(){
    this.ps.deletePointInterests(this.point['_id'])
    .subscribe(deleteInterestsData => {
      this.ps.deletePointById(this.point['_id'])
      .subscribe(deletePointData => this.onDeletePointSuccess(deletePointData))
    })
  }

  onDeletePointSuccess(deletePointData){
    this.router.navigate([`/explore`]);
    this.notificationService.success('Point Deleted!')
  }


}
