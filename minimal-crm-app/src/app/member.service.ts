import { Injectable } from '@angular/core';
import { MemberData, MemberDataDetail, ApplicantDataDetail } from './interfaces';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  domain = "http://localhost:8000/members/";
  memberCountUrl = "count";
  previewAllMembersUrl = "preview";
  detailOneMemberUrl = "detail/";
  createNewMemberUrl = "new";

  constructor(private http: HttpClient){}

  getNumberOfMembers(): Observable<number> {
    return this.http.get<number>(this.domain + this.memberCountUrl);
  }

  getMembers(): Observable<MemberData[]> {
    return this.http.get<MemberData[]>(this.domain + this.previewAllMembersUrl);
  }

  getMemberDetails(_id: number): Observable<MemberDataDetail> {
    return this.http.get<MemberDataDetail>(this.domain + this.detailOneMemberUrl + _id.toString(), { headers: {'Access-Control-Allow-Origin': '*'}});
  }

  createNewMember(member: ApplicantDataDetail): Observable<MemberDataDetail>{
    return this.http.post<MemberDataDetail>(this.domain + this.createNewMemberUrl, member);
  }
}
