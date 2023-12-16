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
  stage: ApplicantStageType;
}
  
export interface ApplicantDataDetail extends ApplicantData, UserDataDetail {
  occupation: string;
  german: string;
  motivation: string[];
  linkedin: string;
  mktChannel: string;
}

export interface MemberData extends UserData {
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
  role: RoleType,
  function: FunctionType,
  stage: MemberStageType;
  jobDescription?: string,
  firstDateInRole: Date,
  lastDateInRole?: Date,
  dateOfRealized?: Date,
  endOfTerm?: Date
}

export type ApplicantStageType = "open" | "contacted" | "toBeInterviewed" | "interviewed" | "onHold" | "toBeRejected" | "rejected" | "candidateNotInterested" | "selected" | "duplicate";
export type ApplicantStageTypeDisplay = "Open" | "Contacted" | "To Be Interviewed" | "Interviewed" | "On Hold" | "To Be Rejected" | "Rejected" | "Candidate Not Interested" | "Selected" | "Duplicate";

export interface ApplicantStage {
  value: ApplicantStageType;
  displayValue: ApplicantStageTypeDisplay;
}

export type MemberStageType = "none" | "accepted" | "approved" | "realized" | "finished" | "completed" | "dropped" | "terminated" | "advanced" | "alumni";
export type MemberStageTypeDisplay = "None" | "Accepted" | "Approved" | "Realized" | "Finished" | "Completed" | "Dropped" | "Terminated" | "Advanced" | "Alumni";

export interface MemberStage {
  value: MemberStageType;
  displayValue: MemberStageTypeDisplay;
}

export interface MotivationForJoining {
  value: string;
  displayValue: string;
}

export type RoleType = "none" | "newbie" | "member" | "teamLeader" | "vicePresident";
export type RoleTypeDisplay = "None" | "Newbie" | "Member" | "Team Leader" | "Vice President";

export interface Role {
  value: RoleType;
  displayValue: RoleTypeDisplay;
}

export type FunctionType = "none" | "finance" | "marketing" | "outgoingGlobalExchange" | "incomingGlobalExchange" | "talentManagement" ;
export type FunctionTypeDisplay = "None" | "Finance" | "Marketing" | "Outgoing Global Exchange" | "Incoming Global Exchange" | "Talent Management";

export interface Function {
  value: FunctionType;
  displayValue: FunctionTypeDisplay;
}