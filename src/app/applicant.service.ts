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
    previewAllApplicantsUrl = this.domain + "preview/all";
    previewCurrentApplicantsUrl = this.domain + "preview/current";
    detailOneApplicantUrl = this.domain + "detail/";
    updateApplicantUrl = this.domain + "update/";

    constructor(private http: HttpClient){}

    getNumberOfOpens(): Observable<number> {
        return this.http.get<number>(this.openCountUrl);
    }

    getApplicants(archived: boolean): Observable<ApplicantData[]> {
        if(archived) {
            return this.http.get<ApplicantData[]>(this.previewAllApplicantsUrl);
        }else {
            return this.http.get<ApplicantData[]>(this.previewCurrentApplicantsUrl);
        }
    }

    getApplicantDetails(_id: number): Observable<ApplicantDataDetail> {
        return this.http.get<ApplicantDataDetail>(this.detailOneApplicantUrl + _id.toString(), { headers: {'Access-Control-Allow-Origin': '*'}});
    }

    updateApplicant(applicant: ApplicantDataDetail): Observable<ApplicantDataDetail> {
        return this.http.put<ApplicantDataDetail>(this.updateApplicantUrl, applicant, { headers: {'Access-Control-Allow-Origin': '*'}});
    }
}