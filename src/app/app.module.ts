import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CandidateService} from './services/candidate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InterviewComponent } from './interview/interview.component';
import { MatTableModule , MatFormFieldModule, MatDialogModule,MatDatepickerModule, MatNativeDateModule,MatInputModule  } from '@angular/material';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewcandidateComponent } from './newcandidate/newcandidate.component';
@NgModule({
  declarations: [
    AppComponent,
    InterviewComponent,
    NewcandidateComponent
  ],
  exports:[NewcandidateComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule ,
    MatInputModule ,
    HttpModule,
    MatDialogModule,   
    RestangularModule.forRoot(RestangularConfigFactory),
    FormsModule,    
    ReactiveFormsModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  entryComponents: [
    NewcandidateComponent
],
  providers: [CandidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
