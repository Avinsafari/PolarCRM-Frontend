import { Injectable } from "@angular/core";
import { ApplicantData, ApplicantDataDetail } from './interfaces';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {
    
    domain = "http://localhost:8000/applicants/";
    openCountUrl = this.domain + "open-count";
    previewAllApplicantsUrl = this.domain + "preview";
    detailOneApplicantUrl = this.domain + "detail/";
    updateApplicantStatusUrl = this.domain + "update-status/";

    constructor(private http: HttpClient){}

    getNumberOfOpens(): Observable<number> {
        return this.http.get<number>(this.openCountUrl);
    }

    getApplicants(): Observable<ApplicantData[]> {
        return this.http.get<ApplicantData[]>(this.previewAllApplicantsUrl);
    }

    getApplicantDetails(_id: number): Observable<ApplicantDataDetail> {
        return this.http.get<ApplicantDataDetail>(this.detailOneApplicantUrl + _id.toString(), { headers: {'Access-Control-Allow-Origin': '*'}});
    }

    updateApplicantStatus(applicant: ApplicantDataDetail): Observable<ApplicantDataDetail> {
        return this.http.put<ApplicantDataDetail>(this.updateApplicantStatusUrl, applicant, { headers: {'Access-Control-Allow-Origin': '*'}});
    }
}