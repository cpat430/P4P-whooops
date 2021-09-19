import {
  Environment,
  Interest,
  LatLng,
  TestingGroup,
  UserProps,
} from './types';

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
  visibleInterests: Interest[] | null;
  constructor(user: UserProps, visibleInterests: Interest[] | null) {
    super();
    this.user = user;
    this.visibleInterests = visibleInterests;
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

export class ClickFriendsAppEvent extends AppEvent {
  name = 'Click Friends';
}

export class LeaveFriendsAppEvent extends AppEvent {
  name = 'Leave Friends';
}

export class SubmitDetailsAppEvent extends AppEvent {
  name = 'Submit Details';
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class StartEnvironmentAppEvent extends AppEvent {
  name = 'Start Environment';
  environment: Environment;
  constructor(environment: Environment) {
    super();
    this.environment = environment;
  }
}

export class StartTestingGroupAppEvent extends AppEvent {
  name = 'Start Testing Group';
  testingGroup: TestingGroup;
  constructor(testingGroup: TestingGroup) {
    super();
    this.testingGroup = testingGroup;
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

export class RemovePathAppEvent extends AppEvent {
  name = 'Remove Path';
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

export class UpdateUserInterestsAppEvent extends AppEvent {
  name = 'UpdateUserInterests';
  interests: Interest[];
  constructor(interests: Interest[]) {
    super();
    this.interests = interests;
  }
}

export class FinishTalkingAppEvent extends AppEvent {
  name = 'FinishTalking';
}
