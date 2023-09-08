export interface ApplicantData {
  _id: number;
  lc: string;
  firstName: string;
  familyName: string;
  status: string;
}
  
export interface ApplicantDataDetail extends ApplicantData {
  email: string;
  telephone: number;
  occupation: string;
  german: string;
  motivation: string;
  linkedin: string;
  cv?: string; 
  mktChannel: string;
  signedUp: Date;
  team: string;
  changelog: string[];
  comments: string[];
}