import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PointsService } from '../../services/points.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-point',
  templateUrl: './create-point.component.html',
  styleUrls: ['./create-point.component.css']
})
export class CreatePointComponent implements OnInit {

  createForm: FormGroup;
  // timeForm: FormGroup;
  post: any;
  defaultInterestLevel: Number = 0;
  // form fields:
  title: string = '';
  description: string = '';
  type: string = '';
  location: string = '';
  date: string = '';
  time: string = '';
  imgUrl: string = '';

  minDate = Date.now();
  datePickerConfig = {
    disableKeypress: true,
    format: 'DD-MM-YYYY'
  }
  timePickerConfig = {
    disableKeypress: false,
    format: 'HH:mm'
  }

  constructor(private ps: PointsService, private fb: FormBuilder, private router: Router) {
    this.createForm = fb.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'type': [null, Validators.required],
      'location': [null, Validators.required],
      'date': [null, ''],
      'time': [null, ''],
      'imgUrl': [null, '']
    })

    // this.timeForm = fb.group({
    //   'time': [null, '']
    // })

  }

  onSubmit(post) {
    this.title = post.title;
    this.description = post.description;
    this.type = post.type;
    this.location = post.location;
    // this.date = post.date;
    // this.time = post.time;
    this.imgUrl = post.imgUrl;


    console.log('post.time');
    console.log(post.time);

    let dateAsNum = Date.parse(post['date']);
    let dateAsDate = new Date(dateAsNum);
    let dateDays = ('' + dateAsDate.getDate()).padStart(2, '00');
    let dateMonths = ('' + (dateAsDate.getMonth() + 1)).padStart(2, '00');
    let dateYears = ('' + dateAsDate.getFullYear()).padStart(4, '0000');
    this.date = dateDays + '-' + dateMonths + '-' + dateYears;

    if (post['time'] && ('' + post['time']).length > 0) {
      let timeAsNum = Date.parse(post['time']);
      let timeAsDate = new Date(timeAsNum);
      let wholeTime = timeAsDate.toTimeString().split(' ')[0];
      let timeWithoutSeconds = wholeTime.slice(0, -3);
      this.time = timeWithoutSeconds;
    } else {
      this.time = undefined;
    }





    let creationModel = {
      title: this.title,
      description: this.description,
      type: this.type,
      location: this.location,
      date: this.date,
      time: this.time,
      imgUrl: this.imgUrl,
      interest: this.defaultInterestLevel

    }

    if (!creationModel['imgUrl'] || creationModel['imgUrl'].length <= 0) {

      creationModel['imgUrl'] = `./../../../assets/images/noimage.png`;
    }

    console.log("creationModel");
    console.log(creationModel);


    this.ps.create(creationModel).subscribe(
      data => { this.creationSuccess(data) },
      error => { this.creationError(error) }
    )

    // console.log(this.ps);

  }


  creationSuccess(data) {
    //TODO: Toastr success msg
    console.log(`CREATED SUCCESSFULLY`);
    console.log(data);

    this.router.navigate(['/explore']);
  }

  creationError(error) {
    //TODO: Toastr error msg
    console.log(`ERROR DURING CREATION`);
    console.log(error);
  }

  clearTime() {
    let timeElement = document.querySelector("#time input")
    timeElement['value'] = ''
    //  console.log(timeElement);
  }

  selectRecreational() {
    let btnRec = document.getElementById("btnRec");
    let btnPrac = document.getElementById("btnPrac");
    let typeElement = document.getElementById("type");
    let dateBlock = document.getElementById("dateBlock");

    // dateBlock.style.visibility = "visible";
    dateBlock.style.display = 'block';
    typeElement['value'] = 'recreational';

    this.createForm.patchValue({ type: 'recreational' })

    btnRec.classList.add("selected-btn");
    btnPrac.classList.remove("selected-btn");


  }

  selectPractical() {
    let btnRec = document.getElementById("btnRec");
    let btnPrac = document.getElementById("btnPrac");
    let typeElement = document.getElementById("type");
    let dateBlock = document.getElementById("dateBlock");

    // dateBlock.style.visibility = "hidden";
    dateBlock.style.display = 'none';
    typeElement['value'] = 'practical';

    this.createForm.patchValue({ type: 'practical' })
    // this.createForm.patchValue({date: '1-1-1'})

    btnPrac.classList.add("selected-btn");
    btnRec.classList.remove("selected-btn");

    let timeElement = document.querySelector("#time input")
    timeElement['value'] = '-'
    let dateElement = document.querySelector("#date input")
    timeElement['value'] = ''
  }

  ngOnInit() {
    this.minDate = Date.now();
  }

}
