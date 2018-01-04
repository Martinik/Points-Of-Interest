import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/auth.service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Authentication Demo';
  
  constructor(
    private authService : AuthenticationService
  ) { }

  ngOnInit() {
    if(this.authService.isLoggedIn && this.authService.userId){
      this.authService.initUser();
    }
  }

  

  
}
