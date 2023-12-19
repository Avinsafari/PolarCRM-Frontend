import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RecruiterDetailComponent } from '../recruiter-detail/recruiter-detail.component';
import { ApplicantData } from '../interfaces';
import { ApplicantService } from '../applicant.service';
import { MatChipSelectionChange } from '@angular/material/chips';
import { DatetimeService } from '../datetime.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})

export class RecruitmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first-name', 'family-name', 'lc', 'stage', 'signup-date'];
  dataSource: MatTableDataSource<ApplicantData> = new MatTableDataSource<ApplicantData>();
  applicants: ApplicantData[] = [];
  openCounter: number = 0;
  includeArchived: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private applicantService: ApplicantService,
    private datetimeService: DatetimeService,
    private displayService: DisplayService
  ) { }

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
        this.dataSource.data = this.applicants;
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
    return this.displayService.getApplicantStageDisplayValue(stage);
  }

  transformDate(date: string): string {
    return this.datetimeService.transformDate(date);
  }
}
