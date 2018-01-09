
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/auth.module';
import { AppRoutesModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DpDatePickerModule} from 'ng2-date-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SearchBarComponent } from './components/common/search/search-bar/search-bar.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { EditComponent } from './components/users/edit/edit.component';
import { UserPointsSectionComponent } from './components/users/user-points/user-points-section/user-points-section.component';
import { UserPointCardComponent } from './components/users/user-points/user-point-card/user-point-card.component';
import { EditPageComponent } from './components/edit/edit-page/edit-page.component';
import { EditPracticalComponent } from './components/edit/edit-practical/edit-practical.component';
import { EditRecreationalComponent } from './components/edit/edit-recreational/edit-recreational.component';
import { SearchResultsPageComponent } from './components/common/search/search-results-page/search-results-page.component';
import { PageNotFoundComponent } from './components/common/error/page-not-found/page-not-found.component';


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
import { OwnerGuard } from './guards/owner.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminUserCardComponent } from './components/admin/admin-user-card/admin-user-card.component';
import { AdminPointCardComponent } from './components/admin/admin-point-card/admin-point-card.component';
import { AdminCardHolderComponent } from './components/admin/admin-card-holder/admin-card-holder.component';
import { AdminGuard } from './guards/admin.guard';





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
    EditComponent,
    UserPointsSectionComponent,
    UserPointCardComponent,
    EditPageComponent,
    EditPracticalComponent,
    EditRecreationalComponent,
    SearchResultsPageComponent,
    PageNotFoundComponent,
    AdminPanelComponent,
    AdminUserCardComponent,
    AdminPointCardComponent,
    AdminCardHolderComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule ,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    AuthGuard,
    OwnerGuard,
    ProfileGuard,
    AdminGuard,
    PointsService,
    CommentsService,
    InterestsService,
    UsersService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
