export interface UserData {
  _id: number;
  lc: string;
  firstName: string;
  familyName: string;
  createdAt: Date;
}

export interface UserDataDetail {
  email: string;
  telephone: number;
  changelog: string[];
  comments: string[];
}

export interface ApplicantData extends UserData {
  status: string;
}
  
export interface ApplicantDataDetail extends ApplicantData, UserDataDetail {
  occupation: string;
  german: string;
  motivation: string;
  linkedin: string;
  cv?: string; 
  mktChannel: string;
  team: string;
}

export interface MemberData extends UserData {
  status: string;
  roleCurrent: MemberRole;
  membershipVerified: boolean;
}

export interface MemberDataDetail extends MemberData, UserDataDetail {
  aiesecEmail: string;
  expaId: number;
  dateJoined: Date;
  rolePast?: MemberRole[];
  files?: string;
}

export interface MemberRole {
  role: string,
  function: string,
  jobDescription: string,
  firstDateInRole: Date,
  lastDateInRole: Date
}