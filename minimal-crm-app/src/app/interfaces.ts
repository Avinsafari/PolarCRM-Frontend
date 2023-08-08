export interface ApplicantData {
  id: number;
  firstName: string;
  familyName: string;
  lc: string;
  status: string;
}
  
export interface ApplicantDataDetail extends ApplicantData {
  email: string;
  telephone: number;
  occupation: string;
  german: string;
  channel: string;
  motivation: string;
  cv: any;
  team: string;
  changelog?: string;
}