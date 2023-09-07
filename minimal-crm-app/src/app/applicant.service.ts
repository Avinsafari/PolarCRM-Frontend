import { Injectable } from "@angular/core";
import { ApplicantData } from './interfaces';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {
    
    allApplicantsUrl = "http://localhost:8000/applicants";

    constructor(private http: HttpClient){}

    getApplicants(): Observable<ApplicantData[]> {
        return this.http.get<ApplicantData[]>(this.allApplicantsUrl);
    }
}