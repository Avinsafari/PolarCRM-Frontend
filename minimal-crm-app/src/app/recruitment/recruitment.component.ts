import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RecruiterDetailComponent } from '../recruiter-detail/recruiter-detail.component';
import { ApplicantData } from '../interfaces';
import { ApplicantService } from '../applicant.service';
import { DateTime } from 'luxon';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})

export class RecruitmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first-name', 'family-name', 'lc', 'stage', 'signup-date'];
  dataSource: MatTableDataSource<ApplicantData>;
  applicants: ApplicantData[] = [];
  openCounter: number = 0;
  includeArchived: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.fetchApplicants();
    this.applicantService.getNumberOfOpens().subscribe(counter => {
      this.openCounter = counter;
    })
  }

  fetchApplicants() {
    try {
      this.applicantService.getApplicants(this.includeArchived).subscribe(applicants => {
        this.applicants = applicants;
        this.dataSource = new MatTableDataSource(this.applicants);
        this.dataSource.paginator = this.paginator;
      });
    } catch (err) {
      console.log(err);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterArchived(event: MatChipSelectionChange) {
    this.includeArchived = event.source.selected;
    this.fetchApplicants();
  }


  openDetails(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = id;
    dialogConfig.width = '80vw';
    dialogConfig.height = '80vh';

    this.dialog.open(RecruiterDetailComponent, dialogConfig);
  }

  transformStageView(stage: string): string {
    
    switch (stage) {
      case 'open':
        return 'Open';
      case 'contacted':
        return 'Contacted';
      case 'toBeInterviewed':
        return 'To Be Interviewed';
      case 'interviewed':
        return 'Interviewed';
      case 'onHold':
        return 'On Hold';
      case 'toBeRejected':
        return 'To Be Rejected';
      case 'rejected':
        return 'Rejected';
      case 'candidateNotInterested':
        return 'Candidate Not Interested';
      case 'selected':
        return 'Selected';
      case 'duplicate':
        return 'Duplicate';
      default:
        return 'Unknown';
    }
  }

  transformDate(date: string): string {
    let transformedDate = DateTime.fromISO(date);
    return transformedDate.toLocal().toLocaleString(DateTime.DATE_MED);
  }
}
