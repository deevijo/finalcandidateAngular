import {Component, NgModule, Inject, Input, Output, Injectable, EventEmitter, OnInit } from '@angular/core';
import { MatFormFieldModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA ,MatDatepickerModule, MatNativeDateModule,MatInputModule } from '@angular/material';
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../shared/candidate';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-newcandidate',
  templateUrl: './newcandidate.component.html',
  styleUrls: ['./newcandidate.component.css']
})
export class NewcandidateComponent implements OnInit {
  candidate : Candidate;
  form: FormGroup;
  onAdd = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<NewcandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {      
    }

  ngOnInit() {
  
  }

  onSubmit()
  {
    this.candidate = new Candidate();
    this.candidate.id = this.data.id;
    this.candidate.name = this.data.name;
    this.candidate.number = this.data.number;
    this.candidate.date = this.data.date;
    this.candidate.skills = this.data.skills;
    this.onAdd.emit(this.candidate);
    this.dialogRef.close();
  }
  

}
