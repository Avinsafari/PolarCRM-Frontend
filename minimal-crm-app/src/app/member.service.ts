import { Injectable } from '@angular/core';
import { MemberData, MemberDataDetail } from './interfaces';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  memberCountUrl = "http://localhost:8000/members/count";
  previewAllMembersUrl = "http://localhost:8000/members/preview";
  detailOneMemberUrl = "http://localhost:8000/members/detail/";

  constructor(private http: HttpClient){}

  getNumberOfMembers(): Observable<number> {
    return this.http.get<number>(this.memberCountUrl);
  }

  getMembers(): Observable<MemberData[]> {
      return this.http.get<MemberData[]>(this.previewAllMembersUrl);
  }

  getMemberDetails(_id: number): Observable<MemberDataDetail> {
      return this.http.get<MemberDataDetail>(this.detailOneMemberUrl + _id.toString(), { headers: {'Access-Control-Allow-Origin': '*'}});
  }
}
