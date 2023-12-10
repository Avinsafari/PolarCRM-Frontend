export interface Comment {
  changedAt: Date;
  entry: string;
  userTyped: boolean;
}

export interface UserData {
  _id: number;
  createdAt: Date;
  lc: string;
  firstName: string;
  familyName: string;
}

export interface UserDataDetail {
  email: string;
  telephone: number;
  comments: Comment[];
}

export interface ApplicantData extends UserData {
  stage: string;
}
  
export interface ApplicantDataDetail extends ApplicantData, UserDataDetail {
  occupation: string;
  german: string;
  motivation: string[];
  linkedin: string;
  mktChannel: string;
}

export interface MemberData extends UserData {
  stage: string;
  currentRole: MemberRole;
  membershipVerified: boolean;
}

export interface MemberDataDetail extends MemberData, UserDataDetail {
  aiesecEmail: string;
  expaId: number;
  dateJoined: Date;
  pastRole?: MemberRole[];
  files?: string;
}

export interface MemberRole {
  role: string,
  function: string,
  jobDescription?: string,
  firstDateInRole: Date,
  lastDateInRole?: Date,
  dateOfRealized?: Date,
  endOfTerm?: Date
}

export type ApplicantStage = "open" | "contacted" | "toBeInterviewed" | "interviewed" | "onHold" | "toBeRejected" | "rejected" | "candidateNotInterested" | "selected" | "duplicate";
export type ApplicantStageDisplay = "Open" | "Contacted" | "To Be Interviewed" | "Interviewed" | "On Hold" | "To Be Rejected" | "Rejected" | "Candidate Not Interested" | "Selected" | "Duplicate";

export interface ApplicantStages {
  value: ApplicantStage;
  displayValue: ApplicantStageDisplay;
}

export type MemberStage = "accepted" | "approved" | "realized" | "finished" | "completed" | "dropped" | "terminated" | "advanced" | "alumni";
export type MemberStageDisplay = "Accepted" | "Approved" | "Realized" | "Finished" | "Completed" | "Dropped" | "Terminated" | "Advanced" | "Alumni";

export interface MemberStages {
  value: MemberStage;
  displayValue: MemberStageDisplay;
}

export interface MotivationForJoining {
  value: string;
  displayValue: string;
}