import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PointsService } from '../../../services/points.service';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-practical',
  templateUrl: './edit-practical.component.html',
  styleUrls: ['./edit-practical.component.css']
})
export class EditPracticalComponent implements OnInit {

  @Input() point: Object;
 

  editForm: FormGroup;
  title: string = '';
  description: string = '';
  location: string = '';
  date: string = '';
  time: string = '';
  imgUrl: string = '';
  type: string = "practical";
  
  constructor(private ps: PointsService, private fb: FormBuilder, private router: Router) {
    
        this.editForm = fb.group({
          'title': [null, Validators.required],
          'description': [null, Validators.required],
          'location': [null, Validators.required],
          'imgUrl': [null, '']
        })
      }

  ngOnInit() {

    this.editForm.patchValue({ title: this.point['title'] });
    this.editForm.patchValue({ description: this.point['description'] });
    this.editForm.patchValue({ location: this.point['location'] });
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
        this.imgUrl = post.imgUrl;
     
    
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
      }

}
