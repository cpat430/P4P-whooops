import { Interest } from './types';

export abstract class AppEvent {
  abstract name: string;
  time: number;
  constructor() {
    this.time = Date.now();
  }
}

export class ClickUserProfileAppEvent extends AppEvent {
  name = 'Click User Profile';
  visibleInterests: Interest[] = []; // TODO What interests are visible when clicking on the profile
}

export class LeaveUserProfileAppEvent extends AppEvent {
  name = 'Leave User Profile';
}

// How does the participant describe their path?

// | 'init-app'
// | 'click-add-friend-button'
// | 'click-user-profile'
// | 'click-edit-interest'
// | 'submit-survey'
// | 'click-location-marker';
