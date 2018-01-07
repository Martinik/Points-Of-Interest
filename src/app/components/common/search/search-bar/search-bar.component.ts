import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  query: string = ''

  constructor( private router : Router) { }

  ngOnInit() {
  }

  getResults(e){
   
    this.router.navigate([`/search/${e}`]);
  }


  

}
