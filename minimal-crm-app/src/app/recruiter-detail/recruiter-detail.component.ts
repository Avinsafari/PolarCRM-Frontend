import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicantData, ApplicantDataDetail } from '../interfaces';
import { ApplicantService } from '../applicant.service';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-recruiter-detail',
  templateUrl: './recruiter-detail.component.html',
  styleUrls: ['./recruiter-detail.component.scss']
})
export class RecruiterDetailComponent implements OnInit {
//   form: FormGroup;
  id: number;
  comments: string[];
  newComment: string;
  applicantStages = [
    { name: "Open", value: "open" },
    { name: "Contacted", value: "contacted" },
    { name: "To Be Interviewed", value: "toBeInterviewed" },
    { name: "Interviewed", value: "interviewed" },
    { name: "On Hold", value: "onHold" },
    { name: "To Be Rejected", value: "toBeRejected" },
    { name: "Rejected", value: "rejected" },
    { name: "Candidate Not Interested", value: "candidateNotInterested" },
    { name: "Selected", value: "selected" },
    { name: "Duplicate", value: "duplicate" },
  ]
  currentApplicantStatus: string;
  applicantDetails: ApplicantDataDetail;

  constructor(
    //   private fb: FormBuilder,
      private dialogRef: MatDialogRef<RecruiterDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ApplicantData,
      private applicantService: ApplicantService,
      private memberService: MemberService
    ) { }

    ngOnInit() {
        this.id = this.data._id;
        // this.form = this.fb.group({
        //     id: [this.id]
        // });
        
        this.comments = [];
        this.newComment = "";
        this.applicantService.getApplicantDetails(this.id).subscribe(applicantData => {
            this.applicantDetails = applicantData;
            this.currentApplicantStatus = this.applicantDetails?.status;
        });
    }

    close() {
        this.dialogRef.close();
    }

    addComment() {
        if (this.newComment != "") {
            this.applicantDetails?.comments.push(this.newComment);
            this.newComment = "";
        }
    }

    saveApplicantChanges() {
        this.applicantDetails.status = this.currentApplicantStatus;
        this.applicantService.updateApplicantStatus(this.applicantDetails).subscribe();
        
        if(this.currentApplicantStatus == "selected"){
          try{
            this.memberService.createNewMember(this.applicantDetails).subscribe();
          }catch(err) {}
        }
        this.close();
    }
}