import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PointsService } from '../../../services/points.service';
import { Router } from '@angular/router';

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

  constructor(private ps: PointsService, private fb: FormBuilder, private router: Router) {

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

    this.editForm.patchValue({ imgUrl: this.point['imgUrl'] });

  }



  onSubmit(post) {

    this.title = post.title;
    this.description = post.description;
    this.location = post.location;
    this.date = post.date;
    this.imgUrl = post.imgUrl;
    this.time = post.time;



    if (post['time'] && ('' + post['time']).length > 0) {
    } else {
      this.time = undefined;
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




    console.log(`final model`);
    console.log(editModel);


    this.ps.editPoint(this.point['_id'], editModel).subscribe(
      data => { this.editSuccess(data) },
      error => { this.editError(error) }
    )


  }

  editSuccess(data) {
    //TODO: Toastr success msg
    console.log(`EDITED SUCCESSFULLY`);
    console.log(data);

    this.router.navigate([`/details/${this.point['_id']}`]);
  }

  editError(error) {
    //TODO: Toastr error msg
    console.log(`ERROR DURING EDIT`);
    console.log(error);
  }

  clearTime() {
    let timeElement = document.querySelector("#time input")
    timeElement['value'] = ''
    //  console.log(timeElement);
  }


}
