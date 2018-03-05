import {Component, NgModule, VERSION, Input, Output, Injectable, EventEmitter, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import {MatTableDataSource, MatFormFieldModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Candidate } from '../shared/candidate';
import { DataSource } from '@angular/cdk/collections';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import {NewcandidateComponent} from '../newcandidate/newcandidate.component';
@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  createForm : FormGroup;
  displayedColumns = ['id', 'name', 'number', 'date','skills', 'actionsColumn'];
  dataSource = null;  
  candidate : Candidate;
  candidates : Candidate[];
  name: string; 
  number: string;
  skills: string;
  date: string;
  isupdate : boolean = false;
  id: string;

  constructor(private restangular: Restangular, private candidateService : CandidateService,  private fb: FormBuilder,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.candidateService.getAll().subscribe( candidates => {this.candidates = candidates,this.dataSource = new MatTableDataSource(this.candidates);});        
  }  

  openinedit(row): void{
    this.isupdate = true;
   this.name = row.name;
   this.skills = row.skills;
   this.date = row.date;
   this.number = row.number;
   this.id = row.id;
   this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(NewcandidateComponent, {
      width: '550px',
      data: {id: this.id,name : this.name, number: this.number, skills : this.skills , date: this.date}     
    });
    let sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
      this.candidate = new Candidate();
      this.candidate.id = res.id
      this.candidate.name = res.name;
      this.candidate.number =res.number;
      this.candidate.date = res.date;
      this.candidate.skills = res.skills;
      if(!this.isupdate)
        this.candidateService.create(this.candidate).subscribe();
      else
        this.candidateService.update(this.candidate).subscribe();
    }); 

    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
      console.log(result);
    this.candidateService.getAll().subscribe( candidates => {this.candidates = candidates,this.dataSource = new MatTableDataSource(this.candidates);});        
    });
  }

  deleteitem(id: number):void{
    this.candidateService.delete(id).subscribe();
  }
}
