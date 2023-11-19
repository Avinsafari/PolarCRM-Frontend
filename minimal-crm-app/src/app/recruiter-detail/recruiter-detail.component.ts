import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicantData, ApplicantDataDetail, ApplicantStages } from '../interfaces';
import { ApplicantService } from '../applicant.service';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-recruiter-detail',
  templateUrl: './recruiter-detail.component.html',
  styleUrls: ['./recruiter-detail.component.scss']
})
export class RecruiterDetailComponent implements OnInit {
  id: number;
  comments: string[];
  newComment: string;
  applicantStages: ApplicantStages[] = [
    {value: 'open', displayValue: 'Open'},
    {value: 'contacted', displayValue: 'Contacted'},
    {value: 'toBeInterviewed', displayValue: 'To Be Interviewed'},
    {value: 'interviewed', displayValue: 'Interviewed'},
    {value: 'onHold', displayValue: 'On Hold'},
    {value: 'toBeRejected', displayValue: 'To Be Rejected'},
    {value: 'rejected', displayValue: 'Rejected'},
    {value: 'candidateNotInterested', displayValue: 'Candidate Not Interested'},
    {value: 'selected', displayValue: 'Selected'},
    {value: 'duplicate', displayValue: 'Duplicate'}
  ];
  currentApplicantStatus: string;
  applicantDetails: ApplicantDataDetail;

  constructor(
      private dialogRef: MatDialogRef<RecruiterDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ApplicantData,
      private applicantService: ApplicantService,
      private memberService: MemberService
    ) { }

    ngOnInit() {
        this.id = this.data._id;
        
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