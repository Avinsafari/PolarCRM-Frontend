import { Injectable } from "@angular/core";
import { ApplicantData, ApplicantDataDetail } from './interfaces';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {
    
    openCountUrl = "http://localhost:8000/applicants/open-count";
    previewAllApplicantsUrl = "http://localhost:8000/applicants/preview";
    detailOneApplicantUrl = "http://localhost:8000/applicants/detail/";

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
}