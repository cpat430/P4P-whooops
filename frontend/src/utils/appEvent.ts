import { Environment, LatLng, UserProps } from './types';

export abstract class AppEvent {
  abstract name: string;
  time: number;
  constructor() {
    this.time = Date.now();
  }
}

export class ClickUserProfileAppEvent extends AppEvent {
  name = 'Click User Profile';
  user: UserProps;
  constructor(user: UserProps) {
    super();
    this.user = user;
  }
}

export class LeaveUserProfileAppEvent extends AppEvent {
  name = 'Leave User Profile';
  user: UserProps;
  constructor(user: UserProps) {
    super();
    this.user = user;
  }
}

export class SubmitDetailsAppEvent extends AppEvent {
  name = 'Submit Details';
}

export class StartEnvironmentAppEvent extends AppEvent {
  name = 'Start Environment';
  environment: Environment;
  constructor(environment: Environment) {
    super();
    this.environment = environment;
  }
}

export class AddToPathAppEvent extends AppEvent {
  name = 'Add To Path';
  latLng: LatLng;
  constructor(latLng: LatLng) {
    super();
    this.latLng = latLng;
  }
}

export class ClickAddFriendButton extends AppEvent {
  name = 'Click Add Friend Button';
  user: UserProps;
  constructor(user: UserProps) {
    super();
    this.user = user;
  }
}

export class ClickRemoveFriendButton extends AppEvent {
  name = 'Click Remove Friend Button';
  user: UserProps;
  constructor(user: UserProps) {
    super();
    this.user = user;
  }
}

export class ClickLocationMarkerAppEvent extends AppEvent {
  name = 'Click Location Marker';
  environment: Environment;
  index: number;
  constructor(environment: Environment, index: number) {
    super();
    this.environment = environment;
    this.index = index;
  }
}
