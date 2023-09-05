export interface UserData {
  id: number;
  firstName: string;
  familyName: string;
  lc: string;
  status: string;
}
  
export interface UserDataDetail extends UserData {
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

export interface MemberData extends UserData{

}

export interface MemberRole {
  member_id: number,
  role_id: number,
  function: string,
  jd: string,
  first_date_of_membership: number
}