import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PointsService } from '../../../../services/points.service';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit {

  searchQuery: string = '';
  filteredResults: Object[];
  searchParams: string[];
  thinkingNum: number = 1;

  constructor(private route: ActivatedRoute, private service: PointsService) { }

  ngOnInit() {
    // console.log(`****INITED`);
    this.searchQuery = this.route.snapshot.paramMap.get('query');
    this.fixSearchQuery();
    this.subscribeToRoute();
    // this.getSearchResults();
  }

  private subscribeToRoute() {
    // console.log(`****SUBSCRIBING`);
    // console.log(`**** 1`);
    this.route.params.subscribe(
      params => {
        this.getThinkingNum();
        this.searchQuery = params['query'];
        this.fixSearchQuery();
        console.log(`**** 1.5`);
        this.getSearchResults();
      });
  }

  getThinkingNum(){
    // this.thinkingNum = Math.floor((Math.random() * 10) + 1);
    
    this.thinkingNum = 1; //Random GIF feature currently turned off
  }

  fixSearchQuery() {
    if (!this.searchQuery) {
      this.searchQuery = '';
    }
  }

  getSearchResults() {
    console.log(`**** 2`);
    this.filteredResults = undefined;
    this.service.getAllPoints().subscribe(
      allPoints => this.filterAllPoints(allPoints)
    )
  }

  filterAllPoints(allPoints) {
    console.log(`GOT all points`);
    console.log(`**** 3`);
    this.searchParams = this.searchQuery.split(' ');
    console.log(`search params`);
    console.log(this.searchParams);
    console.log(`all points`);
    console.log(allPoints);

    this.filteredResults = [];

    for (let point of allPoints) {

      this.evaluateSearchScore(point);

    }

    if (this.filteredResults.length > 0) {
      this.filteredResults.sort(function (a, b) { return b['searchScore'] - a['searchScore'] });
    }


  }


  evaluateSearchScore(point) {

    console.log(`current point`);
    console.log(point['title']);

    let currentScore = 0;

    for (let keyword of this.searchParams) {
      if (keyword.length === 0 || keyword === '') {
        continue;
      }
      for (let key in point) {
        if (point.hasOwnProperty(key)) {

          if (('' + point[key]).toLocaleLowerCase().includes(keyword.toLocaleLowerCase())) {
            currentScore++;
          }

        }
      }

    }

    if (currentScore > 0) {
      let tempPoint = point;
      tempPoint['searchScore'] = currentScore;
      this.filteredResults.push(tempPoint);
      console.log(`PUSHED ` + tempPoint['title']);
    }

    console.log(`current filtered`);
    console.log(this.filteredResults);


  }



}
