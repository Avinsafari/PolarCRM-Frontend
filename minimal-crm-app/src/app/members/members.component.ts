import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MemberData } from '../interfaces';
import { MembersDetailComponent } from '../members-detail/members-detail.component';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'first-name', 'family-name', 'lc', 'status', 'role-current', 'team-current', 'membership-verified'];
  dataSource: MatTableDataSource<MemberData>;
  members: MemberData[] = [];
  memberCounter: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(this.members);
      this.dataSource.paginator = this.paginator;
    });
    this.memberService.getNumberOfMembers().subscribe(counter => {
      this.memberCounter = counter;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = this.members[id];

    this.dialog.open(MembersDetailComponent, dialogConfig);
  }

}
