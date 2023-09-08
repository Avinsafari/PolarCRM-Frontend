import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicantData, ApplicantDataDetail } from '../interfaces';
import { ApplicantService } from '../applicant.service';

@Component({
  selector: 'app-recruiter-detail',
  templateUrl: './recruiter-detail.component.html',
  styleUrls: ['./recruiter-detail.component.scss']
})
export class RecruiterDetailComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  id: number;
  comments: string[];
  newComment: string;
  applicantDetails: ApplicantDataDetail;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<RecruiterDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ApplicantData,
      private applicantService: ApplicantService
    ) { }

    ngOnInit() {
        this.id = this.data._id;
        this.form = this.fb.group({
            id: [this.id]
        });
        
        this.comments = [];
        this.newComment = "";
    }

    async ngAfterViewInit() { //async here not recommended
        await this.applicantService.getApplicantDetails(this.id).subscribe(applicantData => {
            console.table(applicantData);
            this.applicantDetails = applicantData;
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    addComment() {
        if (this.newComment != "") {
            this.comments.push(this.newComment);
            this.newComment = "";
        }
    }

    saveApplicantChanges() {

    }
}