
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/auth.module';
import { AppRoutesModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DpDatePickerModule} from 'ng2-date-picker';


// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SearchBarComponent } from './components/common/search/search-bar/search-bar.component';
import { ProfileComponent } from './components/users/profile/profile.component';

// Services
import { AuthGuard } from './guards/auth.guard.service';
import { CreatePointComponent } from './components/create-point/create-point.component';
import { PointsService } from './services/points.service';
import { ExplorePageComponent } from './components/explore/explore-page/explore-page.component';
import { PointCardComponent } from './components/explore/point-card/point-card.component';
import { DetailsPageComponent } from './components/details/details-page/details-page.component';
import { DetailsCardComponent } from './components/details/details-card/details-card.component';
import { CommentsSectionComponent } from './components/details/comments/comments-section/comments-section.component';
import { CommentCardComponent } from './components/details/comments/comment-card/comment-card.component';
import { SubmitCommentFormComponent } from './components/details/comments/submit-comment-form/submit-comment-form.component'
import { CommentsService } from './services/comments.service';
import { InterestsService } from './services/interests.service';
import { UsersService } from './services/users.service';
import { EditComponent } from './components/users/edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePointComponent,
    ExplorePageComponent,
    PointCardComponent,
    DetailsPageComponent,
    DetailsCardComponent,
    CommentsSectionComponent,
    CommentCardComponent,
    SubmitCommentFormComponent,
    HeaderComponent,
    SearchBarComponent,
    ProfileComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule 
  ],
  providers: [
    AuthGuard,
    PointsService,
    CommentsService,
    InterestsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
