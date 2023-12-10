import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MemberData } from '../interfaces';
import { MembersDetailComponent } from '../members-detail/members-detail.component';
import { MemberService } from '../member.service';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'first-name', 'family-name', 'lc', 'stage', 'role-current', 'team-current', 'membership-verified'];
  dataSource: MatTableDataSource<MemberData>;
  members: MemberData[] = [];
  memberCounter: number = 0;
  filteredMembers: number = 0;
  includeArchived: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private memberService: MemberService) { }

  ngOnInit(): void {
    this.fetchMembers();
    this.memberService.getNumberOfMembers().subscribe(counter => {
      this.memberCounter = counter;
    })
  }

  fetchMembers() {
    try {
      this.memberService.getMembers(this.includeArchived).subscribe(members => {
        this.members = members;
        this.dataSource = new MatTableDataSource(this.members);
        this.dataSource.paginator = this.paginator;
      });
    } catch (err) {
      console.log(err);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredMembers = this.dataSource.filteredData.length;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterArchived(event: MatChipSelectionChange) {
    this.includeArchived = event.source.selected;
    this.fetchMembers();
  }

  openDetails(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = id;
    dialogConfig.width = '80vw';
    dialogConfig.height = '80vh';

    this.dialog.open(MembersDetailComponent, dialogConfig);
  }

  transformStageView(stage: string): string {
    
    switch (stage) {
      case 'accepted':
        return 'Accepted';
      case 'approved':
        return 'Approved';
      case 'realized':
        return 'Realized';
      case 'finished':
        return 'Finished';
      case 'completed':
        return 'Completed';
      case 'dropped':
        return 'Dropped';
      case 'terminated':
        return 'Terminated';
      case 'advanced':
        return 'Advanced';
      case 'alumni':
        return 'Alumni';
      default:
        return 'Unknown';
    }
  }
}
