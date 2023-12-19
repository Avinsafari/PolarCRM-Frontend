import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor() { }

  public getApplicantStageDisplayValue(stage: string): string {
    switch (stage) {
      case 'open':
        return 'Open';
      case 'contacted':
        return 'Contacted';
      case 'toBeInterviewed':
        return 'To be interviewed';
      case 'interviewed':
        return 'Interviewed';
      case 'rejected':
        return 'Rejected';
      case 'onHold':
        return 'On hold';
      case 'toBeRejected':
        return 'To be rejected';
      case 'candidateNotInterested':
        return 'Candidate not interested';
      case 'selected':
        return 'Selected';
      case 'duplicate':

      default:
        return 'Unknown';
    }
  }

  public getMemberStageDisplayValue(stage: string): string {
    switch (stage) {
      case 'none':
        return 'None';
      case 'accepted':
        return 'Accepted';
      case 'approved':
        return 'Approved';
      case 'realized':
        return 'Realized';
      case 'finished':
        return 'Finished';
      case 'completed':
        return 'Completed';
      case 'dropped':
        return 'Dropped';
      case 'terminated':
        return 'Terminated';
      case 'advanced':
        return 'Advanced';
      case 'alumni':
        return 'Alumni';
      default:
        return 'Unknown';
    }
  }

  public getMemberRoleDisplayValue(role: string): string {
    switch (role) {
      case 'none':
        return 'None';
      case 'newbie':
        return 'Newbie';
      case 'member':
        return 'Member';
      case 'teamLeader':
        return 'Team Leader';
      case 'vicePresident':
        return 'Vice President';
      default:
        return 'Unknown';
    }
  }

  public getMemberFunctionDisplayValue(functionName: string): string {
    switch (functionName) {
      case 'none':
        return 'None';
      case 'finance':
        return 'Finance';
      case 'marketing':
        return 'Marketing';
      case 'outgoingGlobalExchange':
        return 'Outgoing Global Exchange';
      case 'incomingGlobalExchange':
        return 'Incoming Global Exchange';
      case 'talentManagement':
        return 'Talent Management';
      default:
        return 'Unknown';
    }
  }
}
